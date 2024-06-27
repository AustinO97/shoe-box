from flask import request
from flask_restful import Resource
from config import db
from models import Review

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200