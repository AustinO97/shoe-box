#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Shoe, User, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

        # Seed Users
        users = []
        for _ in range(10):
            user = User(
                username=fake.unique.user_name()
            )
            users.append(user)
            db.session.add(user)

        db.session.commit()

        # Seed Shoes for each User
        for user in users:
            num_shoes = randint(1, 5)
            for _ in range(num_shoes):
                shoe = Shoe(
                    model=fake.company(),
                    brand=fake.company(),
                    user_id=user.id
                )
                db.session.add(shoe)

        db.session.commit()

        # Seed Reviews for each Shoe
        for shoe in Shoe.query.all():
            num_reviews = randint(0, 3)
            for _ in range(num_reviews):
                review = Review(
                    content=fake.paragraph(nb_sentences=3),
                    rating=randint(1, 5),
                    shoe_id=shoe.id,
                    user_id=fake.random_element(elements=[user.id for user in users])
                )
                db.session.add(review)

        db.session.commit()

        print("Database seeding completed.")