from flask import request
from flask_restful import Resource
from config import db
from models import User

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200