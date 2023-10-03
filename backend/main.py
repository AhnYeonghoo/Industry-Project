from os import path
import os
import secrets
from typing import Annotated
import aiofiles
from fastapi import FastAPI, File, HTTPException, UploadFile
import ffmpegio

app = FastAPI()

ffmpegPath = os.getenv('Ffmpeg');
if ffmpegPath:
    print(f"Ffmpeg path set as {ffmpegPath}")
    ffmpegio.set_path(ffmpegPath)

def tryGetRandomHash() -> str:
    return secrets.token_urlsafe(16);

@app.get("/")
async def root():
    return {"message": "Hello, world!"}

# Update the file extension of filePath to have the right MIME type if this is ever updated!!!
acceptedTypes = ["video/mp4"]

@app.post("/uploadVideo/",
          description="Uploads a video file, which will be processed to extract individual frames.",
          response_description="A unique ID for the video.")
async def uploadVideo(file: Annotated[UploadFile, File(description=f"A video file. Accepted MIME types are: {(', '.join(acceptedTypes))}.")]):
    # 0. Create a unique non-duplicate id of some sort - a hash?
    # 1. Create a folder with said id. Save the file into the temp folder
    # 2. Feed it into ffmpeg - extract frames
    # 3. return the unique id as a JSON object.

    if not file.content_type in acceptedTypes:
        raise HTTPException(415, f"Invalid MIME type of: {file.content_type}. Accepted MIME types are: {(', '.join(acceptedTypes))}.")

    # Currently there is no duplicate checks in place.
    # Duplicate ids should fail at the os.makedirs call.
    # TODO: Check for duplicate hash.
    id = tryGetRandomHash()

    dirPath = path.join(".", "Outputs", id)
    os.makedirs(dirPath)
    filePath = path.join(dirPath, "input.mp4")

    # TODO: Investigate if the temporary file can be eliminated by directly streaming in the file using pipes.
    async with aiofiles.open(filePath, 'wb') as out_file:
        while content := await file.read(4096):
            await out_file.write(content)

    # proc = ffmpegio.ffmpeg(["-i", filePath, "-vf", "scale=224:224,fps=25", path.join(dirPath, '%04d.jpg')])

    ffmpegio.transcode(filePath, path.join(dirPath, '%04d.jpg'), vf="scale=224:224,fps=25")
    # ffmpegio also can read video into numpy arrays for you.
    # framerate, frames = ffmpegio.video.read()...

    os.remove(filePath);

    return {"id": id}