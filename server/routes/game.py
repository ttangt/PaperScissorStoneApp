from flask import render_template
from app import app
from models.game import Game

@app.route("/game/")
def play_game():
    return render_template("game.html")

@app.route("/game/judge", methods = ["POST"])
def judge_result():
    return Game().judge_result()

@app.route("/game/view", methods = ["POST"])
def view_result():
    return Game().view_result()

# # html ajax refresh
# @app.route("/game/refresh", methods = ["POST"])
# def refresh_result():
#     return Game().refresh_result()