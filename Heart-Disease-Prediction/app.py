from flask import Flask, render_template, request
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load("model.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():

    try:
        features = [float(x) for x in request.form.values()]

        features = np.array(features).reshape(1, -1)

        prediction = model.predict(features)

        probability = model.predict_proba(features)[0][1] * 100

        if prediction[0] == 1:
            result = f"⚠️ High Risk of Heart Disease ({probability:.2f}%)"
        else:
            result = f"✅ Healthy Heart ({100-probability:.2f}%)"

        return render_template(
            "index.html",
            prediction_text=result,
            probability=round(probability, 2)
        )

    except Exception as e:
        return render_template(
            "index.html",
            prediction_text=f"Error: {e}"
        )

if __name__ == "__main__":
    app.run(debug=True)