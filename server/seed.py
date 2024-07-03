#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import date

# Remote library imports

# Standard library imports
from datetime import date

# Local imports
from app import app
from models import db, Shoe, User, Review

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        # Clear existing data
        db.session.query(Review).delete()
        db.session.query(Shoe).delete()
        db.session.query(User).delete()

        # Seed Users
        u1 = User(username='Jim')
        u2 = User(username='Sara')
        u3 = User(username='Will')

        db.session.add(u1)
        db.session.add(u2)
        db.session.add(u3)
        db.session.commit()

        # Seed Shoes for each User
        s1 = Shoe(model='Cloudmonster', brand='on', image_url='https://www.fit2run.com/on/demandware.static/-/Sites-fit2run-master-catalog/default/dw0a7c5ea5/large/On/Cloudmonster/undyed-white-white/M61.98288_undyed-white-white_1.png')
        s2 = Shoe(model='Clifton 9', brand='hoka', image_url='https://runpacers.com/cdn/shop/files/Womens-HOKA-ONE-ONE-Clifton-9_df02e23a-1de7-42a3-892e-f0c999eae45d.jpg?v=1704983903')
        s3 = Shoe(model='GS:PGH', brand='Speedland', image_url='https://s3.us-east-1.amazonaws.com/images.gearjunkie.com/uploads/2023/06/GS-PGH.jpg')
        s4 = Shoe(model='Endorphin Speed 3', brand='Saucony', image_url='https://www.runningxpert.com/media/catalog/product/cache/7e8abaf7537934dd81b80ec8cec77ddf/s/a/saucony_endorphin_speed_3_mens_whiteblck.jpg')

        db.session.add(s1)
        db.session.add(s2)
        db.session.add(s3)
        db.session.add(s4)
        db.session.commit()

        # Assign Shoes to Users and Seed Reviews
        r1 = Review(content='Great shoe for long distance but the laces are not my favorite', rating=4, purchase_date=date.today(), shoe=s1, user=u1)
        r2 = Review(content='Love them!', rating=5, purchase_date=date.today(), shoe=s2, user=u2)
        r3 = Review(content="Expensive but worth the money, it's like running on water", rating=5, purchase_date=date.today(), shoe=s3, user=u1)
        r4 = Review(content='Great for everyday training but not for long runs, got bad blisters', rating=4, purchase_date=date.today(), shoe=s4, user=u3)

        db.session.add(r1)
        db.session.add(r2)
        db.session.add(r3)
        db.session.add(r4)
        db.session.commit()

        print("Seed completed successfully.")