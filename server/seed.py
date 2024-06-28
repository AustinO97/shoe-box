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
        db.session.query(User).delete()
        db.session.query(Shoe).delete()
        db.session.query(Review).delete()

        # Seed Users
        u1 = User(username='Jim')
        u2 = User(username='Sara')
        u3 = User(username='Will')

        db.session.add(u1)
        db.session.add(u2)
        db.session.add(u3)
        db.session.commit()

        # Seed Shoes for each User
        s1 = Shoe(model='Cloudmonster', brand='on', image_url='https://www.fit2run.com/on/demandware.static/-/Sites-fit2run-master-catalog/default/dw0a7c5ea5/large/On/Cloudmonster/undyed-white-white/M61.98288_undyed-white-white_1.png', user_id=u1.id)
        s2 = Shoe(model='Clifton 9', brand='hoka', image_url='https://runpacers.com/cdn/shop/files/Womens-HOKA-ONE-ONE-Clifton-9_df02e23a-1de7-42a3-892e-f0c999eae45d.jpg?v=1704983903', user_id=u2.id)
        s3 = Shoe(model='GS:PGH', brand='Speedland', image_url='https://s3.us-east-1.amazonaws.com/images.gearjunkie.com/uploads/2023/06/GS-PGH.jpg', user_id=u1.id)
        s4 = Shoe(model='Endorphin Speed 3', brand='Saucony', image_url='https://www.runningxpert.com/media/catalog/product/cache/7e8abaf7537934dd81b80ec8cec77ddf/s/a/saucony_endorphin_speed_3_mens_whiteblck.jpg', user_id=u3.id)


        db.session.add(s1)
        db.session.add(s2)
        db.session.add(s3)
        db.session.add(s4)
        db.session.commit()

        # Seed Reviews for each Shoe
        r1 = Review(content='great shoe for long distance but the laces are not my favorite', rating=4, shoe_id=s1.id, user_id=u1.id)
        r2 = Review(content='Love them!', rating=5, shoe_id=s2.id, user_id=u2.id)
        r3 = Review(content="Expensive but worth the money, it's like running on water", rating=5, shoe_id=s3.id, user_id=u1.id)
        r4 = Review(content='great for everyday training but not for long runs, got bad blisters', rating=4, shoe_id=s4.id, user_id=u3.id)

        db.session.add(r1)
        db.session.add(r2)
        db.session.add(r3)
        db.session.add(r4)
        db.session.commit()


 
        print("Database seeding completed.")