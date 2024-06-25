#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from resources.routes import *
from models import *


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'
    
api.add_resource(Users, '/users')
api.add_resource(Shoes, '/shoes')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

