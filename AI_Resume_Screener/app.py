from flask import Flask,render_template,request
from resume_parser import extract_resume_text
from skill_extractor import extract_skills
from job_matcher import match_jobs

import os

app = Flask(__name__)

UPLOAD_FOLDER = "resumes"

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze",methods=["POST"])
def analyze():

    file = request.files["resume"]

    filepath = os.path.join(UPLOAD_FOLDER,file.filename)

    file.save(filepath)

    text = extract_resume_text(filepath)

    skills = extract_skills(text)

    jobs = match_jobs(skills)

    best_job = jobs.iloc[0]

    return render_template("results.html",
                           skills=skills,
                           job=best_job["Job_Title"],
                           score=best_job["Match_Score"])


if __name__ == "__main__":
    app.run(debug=True)