from flask import Flask, render_template, request, send_file
import joblib
import numpy as np
import pandas as pd
from datetime import datetime
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet

app = Flask(__name__)

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

with open("accuracy.txt", "r") as f:
    accuracy = f.read()

latest_report = {}

@app.route("/")
def home():
    return render_template(
        "index.html",
        accuracy=accuracy
    )

@app.route("/predict", methods=["POST"])
def predict():

    global latest_report

    try:

        features = [float(x) for x in request.form.values()]

        scaled = scaler.transform(
            np.array(features).reshape(1, -1)
        )

        prediction = model.predict(scaled)

        probability = (
            model.predict_proba(scaled)[0][1] * 100
        )

        if prediction[0] == 1:
            result = (
                f"⚠️ High Risk of Heart Disease "
                f"({probability:.2f}%)"
            )
        else:
            result = (
                f"✅ Healthy Heart "
                f"({100-probability:.2f}%)"
            )

        record = {
            "Date": datetime.now(),
            "Age": features[0],
            "Prediction": result,
            "Risk": round(probability, 2)
        }

        pd.DataFrame([record]).to_csv(
            "history.csv",
            mode="a",
            header=False,
            index=False
        )

        latest_report = record

        history = pd.read_csv(
            "history.csv"
        ).tail(10)

        return render_template(
            "index.html",
            prediction_text=result,
            probability=round(probability, 2),
            accuracy=accuracy,
            history=history.values.tolist()
        )

    except Exception as e:

        return render_template(
            "index.html",
            prediction_text=f"Error: {e}",
            accuracy=accuracy
        )

@app.route("/download_pdf")
def download_pdf():

    pdf_file = "Heart_Report.pdf"

    doc = SimpleDocTemplate(pdf_file)

    styles = getSampleStyleSheet()

    content = []

    content.append(
        Paragraph(
            "Heart Disease Prediction Report",
            styles['Title']
        )
    )

    content.append(Spacer(1, 20))

    for key, value in latest_report.items():

        content.append(
            Paragraph(
                f"<b>{key}</b>: {value}",
                styles['BodyText']
            )
        )

        content.append(Spacer(1, 10))

    doc.build(content)

    return send_file(
        pdf_file,
        as_attachment=True
    )

if __name__ == "__main__":
    app.run(debug=True)