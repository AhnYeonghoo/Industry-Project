import os
import numpy as np
import cv2
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from typing import List, Tuple
import ffmpegio as ff
from einops import rearrange
import torchvision

MODEL_WEIGHTS = "C:/Users/gotos/OneDrive/문서/카카오톡 받은 파일/model_weights.pth"

ffmpegPath = os.getenv('Ffmpeg');
if ffmpegPath:
    # print(f"Ffmpeg path set as {ffmpegPath}")
    ff.set_path(ffmpegPath)

USE_CUDA = torch.cuda.is_available()
# print(USE_CUDA)

device = torch.device('cuda:0' if USE_CUDA else 'cpu')
# print('Processing Device in use:', device)

# ------------------------------------------------------------------------------------------------------------------------ #

###  함수 정의  ###

# 프레임 정보 확인
def get_number_of_frames(file_path: str) -> int:
    probe = ff.probe.video_streams_basic(file_path, index=0)
    return probe[0]['nb_frames']

# div(30) 프레임 추출
def extract_N_video_frames(file_path: str, number_of_samples: int = 6) -> List[np.ndarray]:
    nb_frames = int(get_number_of_frames(file_path= file_path))
    
    div = number_of_samples
    div_frames = nb_frames / div
    temp = 0
    video_frames = []
    cap = cv2.VideoCapture(file_path)
    for ind in range(div):
        cap.set(1,int(temp))
        temp += div_frames
        res, frame = cap.read()
        video_frames.append(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    cap.release()
    
    del cap
    return video_frames

# 이미지 크기 변환 (default: 224x224)
def resize_image(image: np.ndarray, new_size: Tuple[int,int]) -> np.ndarray:
    return cv2.resize(image, new_size, interpolation = cv2.INTER_AREA)


def preprocessing_input(file_path: str, training: bool = True) -> Tuple[np.ndarray, np.ndarray]:
    sampled = extract_N_video_frames(file_path = file_path, number_of_samples=30)
    resized_images = [resize_image(image= im, new_size= (224,224)) for im in sampled]
    preprocessed_video = np.stack(resized_images)

    return preprocessed_video

# 데이터 Loader
class SignLanGuageDataset(Dataset):
    def __init__(self,imagedata):
        self.imagedata=imagedata

    def __len__(self):
        return len(self.imagedata)

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        image_data=(self.imagedata[idx])
        image_data=torch.FloatTensor(image_data)

        return image_data

###  모델  ###
def convert_relu_to_swish(model):
        for child_name, child in model.named_children():
            if isinstance(child, nn.ReLU):
                setattr(model, child_name, nn.SiLU(True))
                # setattr(model, child_name, Swish())
            else:
                convert_relu_to_swish(child)

class Swish(nn.Module):
    def __init__(self):
        super().__init__()

    def forward(self, x):
        return x.mul_(torch.sigmoid(x))

class r2plus1d_18(nn.Module):
    def __init__(self, pretrained=False, num_classes=10, dropout_p=0.5):
        super(r2plus1d_18, self).__init__()
        self.pretrained = pretrained
        self.num_classes = num_classes
        model = torchvision.models.video.r2plus1d_18(pretrained=self.pretrained)
        # delete the last fc layer
        modules = list(model.children())[:-1]
        # print(modules)
        self.r2plus1d_18 = nn.Sequential(*modules)
        convert_relu_to_swish(self.r2plus1d_18)
        self.fc1 = nn.Linear(model.fc.in_features, self.num_classes)
        self.dropout = nn.Dropout(dropout_p, inplace=True)
        # self.softmax = nn.Softmax(dim=1)
        
    def forward(self, x):
        out = self.r2plus1d_18(x)
        # print(out.shape)
        # Flatten the layer to fc
        out = out.flatten(1)
        out = self.dropout(out)
        out = self.fc1(out)
        # out = self.softmax(out)
        return out

class flow_r2plus1d_18(nn.Module):
    def __init__(self, pretrained=False, num_classes=10, dropout_p=0.5):
        super(flow_r2plus1d_18, self).__init__()
        self.pretrained = pretrained
        self.num_classes = num_classes
        model = torchvision.models.video.r2plus1d_18(pretrained=self.pretrained)

        model.stem[0] = nn.Conv3d(2, 45, kernel_size=(1, 7, 7),
                            stride=(1, 2, 2), padding=(0, 3, 3),
                            bias=False)

        # delete the last fc layer
        modules = list(model.children())[:-1]
        # print(modules)
        self.r2plus1d_18 = nn.Sequential(*modules)
        convert_relu_to_swish(self.r2plus1d_18)
        self.fc1 = nn.Linear(model.fc.in_features, self.num_classes)
        self.dropout = nn.Dropout(dropout_p, inplace=True)
    def forward(self, x):
        # print(x.size())
        out = self.r2plus1d_18(x)
        # print(out.shape)
        # Flatten the layer to fc
        out = out.flatten(1)
        out = self.dropout(out)
        out = self.fc1(out)

        return out
    
# output
# 10-dimension one-hot encoding 값으로 출력됨

# [1 0 0 0 0 0 0 0 0 0] : 가렵다
# [0 1 0 0 0 0 0 0 0 0] : 가슴
# [0 0 1 0 0 0 0 0 0 0] : 감전
# [0 0 0 1 0 0 0 0 0 0] : 개
# [0 0 0 0 1 0 0 0 0 0] : 거실
# [0 0 0 0 0 1 0 0 0 0] : 계곡
# [0 0 0 0 0 0 1 0 0 0] : 기절
# [0 0 0 0 0 0 0 1 0 0] : 도둑
# [0 0 0 0 0 0 0 0 1 0] : 동전
# [0 0 0 0 0 0 0 0 0 1] : 아빠

label_mapping = {
    0: '가렵다',
    1: '가슴',
    2: '감전',
    3: '개',
    4: '거실',
    5: '계곡',
    6: '기절',
    7: '도둑',
    8: '동전',
    9: '아빠'
}

def one_hot_to_string(one_hot_vector):
    # 가장 큰 값의 인덱스를 찾음
    index = np.argmax(one_hot_vector)
    
    # 인덱스에 해당하는 라벨을 찾아 반환
    return label_mapping[index]

# Keep the model loaded to prevent unnecessary processing
model = r2plus1d_18(num_classes = 10).to(device)
# criterion = torch.nn.CrossEntropyLoss().to(device)
# optimizer = torch.optim.Adam(model.parameters(), lr=3e-4)

model.load_state_dict(torch.load(MODEL_WEIGHTS))
model.eval()

def predict_sign(filePath: str) -> str:
    test_data= [preprocessing_input(file_path=filePath)]

    test_dataset = SignLanGuageDataset(imagedata=test_data)
    test_dataloader = DataLoader(dataset=test_dataset, batch_size=1, shuffle=False, num_workers=4)

    with torch.cuda.device(0):
        for data in test_dataloader:
            data = rearrange(data, 'b d h w c -> b c d h w')
            data = data.to(device)
            
            output = model(data)

    result = one_hot_to_string(output.cpu().detach().numpy())
    return result;