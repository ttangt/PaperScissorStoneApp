from flask import Flask, render_template, redirect, session
from flask_cors import CORS

import os
# from datetime import timedelta
from functools import wraps
import pymongo
# import redis
from dotenv import load_dotenv

app = Flask(__name__)

CORS(app)

# flask session for cookies
app.secret_key = os.urandom(16)
# app.permanent_session_lifetime = timedelta(minutes = 30)

# use redis as session if necessary
# app.config['SESSION_TYPE'] = 'redis'
# app.config['SESSION_PERMANENT'] = False
# app.config['SESSION_USE_SIGNER'] = True
# app.config['SESSION_REDIS'] = redis.from_url('redis://127.0.0.1:6379')

# mongodb
mongodb_url = os.getenv("MONGODB_URL")
client = pymongo.MongoClient(mongodb_url)

# app database
db = client.paper_scissor_stone_app

# routes
from routes import user, game

@app.route("/")
def home():
    return render_template("home.html")

# # for ajax html
# # decorators checks if already logged in
# def login_required(f):
#     @wraps(f)
#     def wrap(*args, **kwargs):
#         if "logged_in" in session:
#             return f(*args, **kwargs)
#         else:
#             print("BAD")
#             return redirect("/")
        
#     return wrap

# # for ajax html
# @app.route("/dashboard/")
# @login_required
# def dashboard():
#     return render_template("dashboard.html")