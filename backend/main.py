from os import path
import os
import secrets
from typing import Annotated
import aiofiles
from fastapi import FastAPI, File, HTTPException, UploadFile
import ffmpegio
from model import predict_sign

app = FastAPI()

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

acceptedTypes = {"video/mp4": "mp4", "video/quicktime": "mov"}

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
    filePath = path.join(dirPath, f"{id}.{acceptedTypes[file.content_type]}")

    # TODO: Investigate if the temporary file can be eliminated by directly streaming in the file using pipes.
    async with aiofiles.open(filePath, 'wb') as out_file:
        while content := await file.read(4096):
            await out_file.write(content)

    sign = predict_sign(filePath);

    os.remove(filePath);

    return {"predicted": sign}