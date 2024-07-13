from flask import request, abort
from flask_restful import Resource
from config import db
from models import User

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return users, 200
    
    def post(self):
        data = request.get_json()

        try:
            new_user = User(
                username=data['username']
            )
            db.session.add(new_user)
            db.session.commit()

        except ValueError as e:
            abort(422, e.args[0])

        return new_user.to_dict(), 201