#!/usr/bin/env python3

# Standard library imports
from dotenv import load_dotenv
load_dotenv()

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
api.add_resource(ShoesByID, '/shoes/<int:id>')
api.add_resource(Reviews, '/reviews')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

