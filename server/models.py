from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    shoes = db.relationship('Shoe', secondary='reviews', back_populates='users')

    serialize_rules = ('-reviews.user', '-reviews.shoe.users', '-shoes')

    @validates('username')
    def validates_username(self, key, username):
        if not username:
            raise ValueError('Please enter a username')
        return username

class Shoe(db.Model, SerializerMixin):
    __tablename__ = 'shoes'

    id = db.Column(db.Integer, primary_key=True)
    model = db.Column(db.String(80), nullable=False)
    brand = db.Column(db.String(80), nullable=False)
    image_url = db.Column(db.String)
    reviews = db.relationship('Review', back_populates='shoe', cascade='all, delete-orphan')
    users = db.relationship('User', secondary='reviews', back_populates='shoes')

    serialize_rules = ('-reviews.shoe', '-users')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    shoe_id = db.Column(db.Integer, db.ForeignKey('shoes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    shoe = db.relationship('Shoe', back_populates='reviews')
    user = db.relationship('User', back_populates='reviews')

    serialize_rules = ('-user.reviews', '-shoe.reviews')
