def get_response(emotion):
    responses = {
        "happy": "That's great! Keep smiling 😊",
        "sad": "I'm here for you. Things will get better 💙",
        "stress": "Take a deep breath. Try some relaxation 🧘"
    }
    return responses.get(emotion, "Tell me more about how you feel.")