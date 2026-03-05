import easyocr
import numpy as np
import cv2

reader = easyocr.Reader(['en'])

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    result = reader.readtext(image)

    extracted_text = " ".join([text[1] for text in result])

    vec = vectorizer.transform([extracted_text])

    pred = model.predict(vec)[0]

    risk_score = 80 if pred == 1 else 10
    status = "Scam" if pred == 1 else "Safe"

    return {
        "extracted_text": extracted_text,
        "riskScore": risk_score,
        "status": status
    }