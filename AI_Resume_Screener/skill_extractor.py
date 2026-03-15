import spacy

nlp = spacy.load("en_core_web_sm")

skills_list = [
"python","machine learning","deep learning",
"nlp","sql","html","css","javascript",
"react","nodejs","django","tensorflow",
"data analysis","excel","statistics"
]

def extract_skills(text):

    doc = nlp(text.lower())

    extracted_skills = []

    for token in doc:
        if token.text in skills_list:
            extracted_skills.append(token.text)

    return list(set(extracted_skills))