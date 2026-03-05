from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from fastapi import FastAPI, UploadFile, File
from PIL import Image
import pytesseract
import io

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

app = FastAPI()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("saved_model/model.pkl")
vectorizer = joblib.load("saved_model/vectorizer.pkl")


class Message(BaseModel):
    text: str


@app.get("/")
def home():
    return {"msg": "Backend running"}


@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents))

    extracted_text = pytesseract.image_to_string(image)

    vec = vectorizer.transform([extracted_text])

    prediction = model.predict(vec)[0]

    if prediction == 1:
        status = "Scam"
        risk = 80
    else:
        status = "Safe"
        risk = 10

    return {
        "extracted_text": extracted_text,
        "riskScore": risk,
        "status": status
    }