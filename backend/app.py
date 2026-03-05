from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

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


@app.post("/analyze")
def analyze(msg: Message):

    vec = vectorizer.transform([msg.text])

    prediction = model.predict(vec)[0]

    if prediction == 1:
        status = "Scam"
        risk = 80
    else:
        status = "Safe"
        risk = 10

    return {
        "riskScore": risk,
        "status": status
    }