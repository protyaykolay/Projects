import pandas as pd

def match_jobs(candidate_skills):

    jobs = pd.read_csv("dataset/jobs.csv")

    scores = []

    for index,row in jobs.iterrows():

        job_skills = row["Skills"].lower().split(",")

        match_count = len(set(candidate_skills) & set(job_skills))

        score = match_count / len(job_skills)

        scores.append(score)

    jobs["Match_Score"] = scores

    return jobs.sort_values(by="Match_Score",ascending=False)