def rank_candidate(score):

    if score > 0.75:
        return "Excellent Match"

    elif score > 0.5:
        return "Good Match"

    elif score > 0.3:
        return "Average Match"

    else:
        return "Low Match"