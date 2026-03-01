from fastapi import FastAPI
from pydantic import BaseModel
import joblib
from fastapi.middleware.cors import CORSMiddleware

# create app first
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load model
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

    pred = model.predict(vec)[0]
    prob = model.predict_proba(vec)[0][1]

    risk = int(prob * 100)

    status = "Scam" if pred == 1 else "Safe"

    return {
        "message": msg.text,
        "riskScore": risk,
        "status": status
    }