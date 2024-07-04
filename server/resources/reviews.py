from flask import request, abort
from flask_restful import Resource
from config import db
from models import Review, Shoe, User

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200
    
    def post(self):
        data = request.get_json()

        shoe = Shoe.query.get(data['shoe_id'])
        user = User.query.get(data['user_id'])
        if not shoe:
            abort(404, 'Shoe not found')
        if not user:
            abort(404, 'User not found')

        try:
            new_review = Review(
                content=data['content'],
                rating=data['rating'],
                shoe_id=data['shoe_id'],
                user_id=data['user_id']
            )
            db.session.add(new_review)
            db.session.commit()
            return new_review.to_dict(), 201

        except ValueError as e:
            abort(422, e.args[0])
