from flask import jsonify, request, session, redirect
from passlib.hash import pbkdf2_sha256
from app import db
import uuid

from models.game import list_results

class User:
    def start_session(self, user):
        del user["password"]

        # # use session for html ajax
        # session["logged_in"] = True
        # session["user"] = user
        # results = list_results(session["user"]["email"])
        # session["user"]["results"] = results

        # return jsonify(""), 200
        return jsonify(user), 200
    
    def sign_up(self):
        # user object
    
        # get request from ajax or axios post
        user = {
            "_id": uuid.uuid4().hex,
            "name": request.form.get("name"),
            "email": request.form.get("email"),
            "password": request.form.get("password")
        }

        # encrypt password
        user["password"] = pbkdf2_sha256.encrypt(user["password"])

        # check for existing email address
        if db.users.find_one({"email": user["email"]}):
            return jsonify({"error": "Email address already in use"}), 400
        
        # create user query
        if db.users.insert_one(user):
            return self.start_session(user)
        
        return jsonify({"error": "Sign Up Failed"}), 400
    
    def sign_out(self):
        session.clear() # clear cookies
        return redirect("/")
    
    def log_in(self):
        print("LOGIN!!!")
        user = db.users.find_one({
            "email": request.form.get("email")
        })

        # check user email and password
        if user and pbkdf2_sha256.verify(request.form.get("password"), user["password"]):
            return self.start_session(user)
        
        return jsonify({"error": "Invalid log in credentials"}), 401


