from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained ML model
model = joblib.load("saved_model/model.pkl")
vectorizer = joblib.load("saved_model/vectorizer.pkl")


@app.get("/")
def home():
    return {"message": "SecurePay AI Backend Running"}


@app.post("/analyze")
def analyze(data: dict):

    text = data["text"]

    vec = vectorizer.transform([text])

    prediction = model.predict(vec)[0]

    if prediction == 1:
        risk_score = 80
        status = "Scam"
    else:
        risk_score = 10
        status = "Safe"

    return {
        "riskScore": risk_score,
        "status": status
    }