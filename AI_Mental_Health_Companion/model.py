from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Sample dataset
texts = [
    "I am very happy", "I feel great", 
    "I am sad", "I feel depressed",
    "I am stressed", "too much pressure"
]

labels = [
    "happy", "happy",
    "sad", "sad",
    "stress", "stress"
]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

model = MultinomialNB()
model.fit(X, labels)

def predict_emotion(text):
    X_test = vectorizer.transform([text])
    return model.predict(X_test)[0]