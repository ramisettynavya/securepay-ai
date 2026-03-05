from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import joblib
import pytesseract
from PIL import Image
import io

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model and vectorizer
model = joblib.load("saved_model/model.pkl")
vectorizer = joblib.load("saved_model/vectorizer.pkl")


@app.get("/")
def home():
    return {"message": "SecurePay AI Backend Running"}


# -------- TEXT ANALYSIS --------

@app.post("/analyze")
def analyze(data: dict):

    text = data["text"]

    vec = vectorizer.transform([text])

    pred = model.predict(vec)[0]

    risk_score = 80 if pred == 1 else 10
    status = "Scam" if pred == 1 else "Safe"

    return {
        "riskScore": risk_score,
        "status": status
    }


# -------- IMAGE ANALYSIS --------

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    contents = await file.read()

    image = Image.open(io.BytesIO(contents))

    extracted_text = pytesseract.image_to_string(image)

    vec = vectorizer.transform([extracted_text])

    pred = model.predict(vec)[0]

    risk_score = 80 if pred == 1 else 10
    status = "Scam" if pred == 1 else "Safe"

    return {
        "extracted_text": extracted_text,
        "riskScore": risk_score,
        "status": status
    }