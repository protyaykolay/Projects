from flask import Flask, request, jsonify, render_template
from model import predict_emotion
from responses import get_response

# ✅ Create app FIRST
app = Flask(__name__)

# ✅ Home route
@app.route("/")
def home():
    return "AI Mental Health Companion is running! Use /chat?message=your_text or /ui"

# ✅ UI route (for chatbot interface)
@app.route("/ui")
def ui():
    return render_template("index.html")

# ✅ Chat route using GET
@app.route("/chat", methods=["GET"])
def chat():
    try:
        # Get message from URL
        user_input = request.args.get("message")

        # Check if message exists
        if not user_input:
            return jsonify({
                "error": "Please provide a message like /chat?message=I feel sad"
            }), 400

        # Predict emotion
        emotion = predict_emotion(user_input)

        # Get response
        reply = get_response(emotion)

        # Return result
        return jsonify({
            "user_input": user_input,
            "emotion": emotion,
            "reply": reply
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Run app
if __name__ == "__main__":
    app.run(debug=True)