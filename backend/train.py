import pandas as pd
import joblib
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

data = pd.read_csv("fraud_dataset.csv")

X = data["message"]
y = data["label"]

vectorizer = TfidfVectorizer(ngram_range=(1,2))
X_vec = vectorizer.fit_transform(X)

model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X_vec, y)

os.makedirs("saved_model", exist_ok=True)

joblib.dump(model, "saved_model/model.pkl")
joblib.dump(vectorizer, "saved_model/vectorizer.pkl")

print("Model trained successfully")