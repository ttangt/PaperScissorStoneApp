from flask import jsonify, request, session, redirect
# from passlib.hash import pbkdf2_sha256
from app import db
import uuid
from datetime import datetime
import pymongo

COUNT_DIGIT_LIM = 6

def list_results(email):
    results = {}
    count = 0
    queries = db.games.find({"email": email}).sort("created_at", pymongo.DESCENDING)
    
    for result in queries:
        count_str_temp = str(count)

        if len(count_str_temp) <= COUNT_DIGIT_LIM:
            add_count = COUNT_DIGIT_LIM - len(count_str_temp)
            for _ in range(add_count):
                count_str_temp = "0" + count_str_temp

            count_str = count_str_temp
        # results[str(count)] = result["result"]
        results[count_str] = result["result"]
        count += 1
    
    return results

class Game:
    def judge_result(self):
        player_choice = request.form.get('player_choice')
        opponent_choice = request.form.get('opponent_choice')

        if player_choice != opponent_choice:
            if player_choice == "paper":
                if opponent_choice == "scissor":
                    result = "lose"
                else:
                    result = "win"
            elif player_choice == "scissor":
                if opponent_choice == "stone":
                    result = "lose"
                else:
                    result = "win"
            else:
                if opponent_choice == "paper":
                    result = "lose"
                else:
                    result = "win"
        else:
            result = "fair"

        # html ajax
        # game = {
        #     "_id": uuid.uuid4().hex,
        #     "email": session["user"]["email"],
        #     "created_at": datetime.now(),
        #     "player_choice": player_choice,
        #     "opponent_choice": opponent_choice,
        #     "result": result
        # }
        
        # react native
        game = {
            "_id": uuid.uuid4().hex,
            "email": request.form.get('email'),
            "created_at": datetime.now(),
            "player_choice": player_choice,
            "opponent_choice": opponent_choice,
            "result": result
        }

        db.games.insert_one(game)
        return jsonify(game), 200
 
    def view_result(self):
        print("view result")
        email = request.form.get('email')

        results = list_results(email)

        return jsonify(results), 200

    # # html ajax refresh result
    # def refresh_result(self):
    #     results = list_results(session["user"]["email"])
    #     session["user"]["results"] = results
    #     session.modified = True
    #     return jsonify({"a": "a"}), 200


