from flask import request
from flask_restful import Resource
from config import db
from models import Shoe

class Shoes(Resource):
    def get(self):
        shoes = [shoe.to_dict() for shoe in Shoe.query.all()]
        return shoes, 200