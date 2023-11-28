from os import path
import os
import secrets
from typing import Annotated
import aiofiles
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import ffmpegio
from model import predict_sign

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ffmpegPath = os.getenv('Ffmpeg');
if not ffmpegPath:
    print(f"Ffmpeg environment variable is not set.")
else:
    ffmpegio.set_path(ffmpegPath)

def tryGetRandomHash() -> str:
    return secrets.token_urlsafe(16);

@app.get("/")
async def root():
    return {"message": "Hello, world!"}

acceptedTypes = {"video/mp4": "mp4", "video/quicktime": "mov", "video/webm": "webm"}

@app.post("/predict/",
          description="Attempts to predict a word given a sign language video.",
          response_description="The predicted word.")
async def predict(file: Annotated[UploadFile, File(description=f"A video file. Accepted MIME types are: {(', '.join(acceptedTypes))}.")]):
    # 0. Create a unique non-duplicate id of some sort - a hash?
    # 1. Create a folder with said id. Save the file into the temp folder
    # 2. Feed it into ffmpeg - extract frames
    # 3. return the unique id as a JSON object.

    if not file.content_type in acceptedTypes:
        raise HTTPException(415, f"Invalid MIME type of: {file.content_type}. Accepted MIME types are: {(', '.join(acceptedTypes))}.")

    # Currently there is no duplicate checks in place.
    # Duplicate ids should fail at the os.makedirs call.
    # TODO: Check for duplicate hash?
    id = tryGetRandomHash()

    dirPath = path.join(".", "Outputs")
    os.makedirs(dirPath, exist_ok=True)
    webmFilePath = path.join(dirPath, f"{id}.{acceptedTypes[file.content_type]}")
    mp4FilePath = path.join(dirPath, f"{id}.mp4")

    # TODO: Investigate if the temporary file can be eliminated by directly streaming in the file using pipes.
    async with aiofiles.open(webmFilePath, 'wb') as out_file:
        while content := await file.read(4096):
            await out_file.write(content)

    # Transcode the webm file to mp4 before feeding it through the system.
    # For some reason we cannot read the metadata off of the webm file due to ffprobe throwing the following error:
    # [matroska,webm @ 000002b953279000] Found unknown-length element with ID 0x18538067 at pos. 0x23271 for which no syntax for parsing is available.
    # However, if we transcode the video in mp4 before feeding it through the pre-processing logic of the video,
    # we are able to get it working despite ffmpeg still complaining it can't read the metadata correctly.

    ffmpegio.transcode(webmFilePath, mp4FilePath, overwrite=True)
    os.remove(webmFilePath);
    sign = predict_sign(mp4FilePath);
    os.remove(mp4FilePath);
    return {"predicted": sign}