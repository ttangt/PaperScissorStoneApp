# from flask import redirect
from app import app
from models.user import User
from models.game import Game

@app.route("/user/signup", methods=["GET", "POST"])
def sign_up():
    return User().sign_up()

@app.route("/user/signout")
def sign_out():
    return User().sign_out()

@app.route("/user/login", methods=["POST"])
def log_in():
    return User().log_in()

# @app.route("/user/results")
# def list_results():
#     Game().list_results()
#     # return Game().list_results()
#     return redirect("/dashboard")