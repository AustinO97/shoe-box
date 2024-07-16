from flask import request, abort
from flask_restful import Resource
from config import db
from models import Category

class Categories(Resource):
    def get(self):
        categories = [category.to_dict() for category in Category.query.all()]
        return categories, 200
    
class CategoryByID(Resource):
    def get(self, id):
        category = Category.query.filter(Category.id == id).first()
        if not category:
            abort(404, 'Category not found')
        return category.to_dict(), 200
    