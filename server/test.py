from app import app
from models import User, Shoe, Review
from config import db

def test_serialization():
    with app.app_context():
        # Fetch instances from the database
        users = User.query.all()
        shoes = Shoe.query.all()
        reviews = Review.query.all()

        # Serialize instances
        serialized_users = [user.to_dict() for user in users]
        serialized_shoes = [shoe.to_dict() for shoe in shoes]
        serialized_reviews = [review.to_dict() for review in reviews]

        print("Serialized Users:", serialized_users)
        print("Serialized Shoes:", serialized_shoes)
        print("Serialized Reviews:", serialized_reviews)

if __name__ == '__main__':
    test_serialization()