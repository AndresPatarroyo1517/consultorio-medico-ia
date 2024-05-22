import cv2
import numpy as np
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, Request
import speech_recognition as sr

app = FastAPI()
templates = Jinja2Templates(directory="templates")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/video")
async def video_feed():
    cap = cv2.VideoCapture(0)

    def generate():
        while True:
            success, frame = cap.read()
            if not success:
                break

            ret, buffer = cv2.imencode('.jpg', frame)

            if not ret:
                continue

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

    return StreamingResponse(
        generate(),
        media_type="multipart/x-mixed-replace;boundary=frame")


@app.get("/")
async def get_html(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/habla")
async def obtener_habla():
    r = sr.Recognizer() 
    with sr.Microphone() as recurso:
        audio = r.listen(recurso)
        try:
            texto = r.recognize_google(audio, language='es-ES')
            print(texto)
            return texto
        except:
            return 'No se escucho, repite de nuevo'