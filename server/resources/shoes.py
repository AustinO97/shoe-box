from flask import request, abort
from flask_restful import Resource
from config import db
from models import Shoe, Category

class Shoes(Resource):
    def get(self):
        shoes = [shoe.to_dict() for shoe in Shoe.query.all()]
        return shoes, 200
    
    def post(self):
        data = request.get_json()

        try:
            new_shoe = Shoe(
                model=data['model'],
                brand=data['brand'],
                image_url=data['image_url'],
                category_id=data['category_id']
            )
            db.session.add(new_shoe)
            db.session.commit()
            return new_shoe.to_dict(), 201
        
        except ValueError as e:
            abort(422, e.args[0])
        

class ShoesByID(Resource):

    def get(self, id):
        shoe = Shoe.query.filter(Shoe.id == id).first()
        if not shoe:
            abort(404, 'Shoe not found')
        return shoe.to_dict(), 200
    
    def patch(self, id):
        data = request.get_json()
        shoe = Shoe.query.filter(Shoe.id == id).first()

        if not shoe:
            abort(404, 'Shoe not found')

        for attr, value in data.items():
            if attr == 'category_id':
                category = Category.query.get(value)
                if not category:
                    abort(404, 'Category not found')
                setattr(shoe, 'category', category)
            else:
                setattr(shoe, attr, value)

        db.session.commit()
        return shoe.to_dict(), 202

    def delete(self, id):
        shoe = Shoe.query.filter(Shoe.id == id).first()
        db.session.delete(shoe)
        db.session.commit()
        return '', 204