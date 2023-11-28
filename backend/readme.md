# Backend
## Pre-requisites
Python dependencies:
```bash
pip install fastapi[all] python-multipart ffmpegio aiofiles
```

AI dependencies:
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install einops opencv-python
```

Installing `fastapi[all]` also makes the `uvicorn` command available.

In addition, [ffmpeg executables must be installed & available globally](https://python-ffmpegio.github.io/python-ffmpegio/install.html#install-ffmpeg-program) or located manually, with the `Ffmpeg` Environment variable set as the path to the folder containing ffmpeg and ffprobe executables.

## Developing

### With VSCode

Edit the `Ffmpeg` environment variable in `launch.json`.

Open the current directory. Press F5, then use 'Python: FastAPI' debug config to start the server.

### Through command line

To start the server, do:
```bash
uvicorn main:app --reload
```
### Testing
By default, the API is available at http://127.0.0.1:8000. Interactive documentation of the API (via Swagger) is available at http://127.0.0.1:8000/docs.

Changes will automatically trigger reloads (`--reload`).

