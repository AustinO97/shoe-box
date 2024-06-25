#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        # import ipdb; ipdb.set_trace()
        if users:
            return users, 200
        return {}, 404
    
api.add_resource(Users, '/users')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

