from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')
    shoes = db.relationship('Shoe', secondary='reviews', back_populates='users', overlaps='reviews')

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
    reviews = db.relationship('Review', back_populates='shoe', cascade='all, delete-orphan', overlaps='users')
    users = db.relationship('User', secondary='reviews', back_populates='shoes', overlaps='reviews')
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category = db.relationship('Category', back_populates='shoes')

    serialize_rules = ('-reviews.shoe', '-users', '-category.shoes')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    shoe_id = db.Column(db.Integer, db.ForeignKey('shoes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    shoe = db.relationship('Shoe', back_populates='reviews', overlaps='users,shoes')
    user = db.relationship('User', back_populates='reviews', overlaps='shoes,users')

    serialize_rules = ('-user.reviews', '-shoe.reviews')

class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), unique=True, nullable=False)
    shoes = db.relationship('Shoe', back_populates='category')

    serialize_rules = ('-shoes.category', )