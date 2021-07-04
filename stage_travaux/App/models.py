from datetime import datetime
from App import db, login_manager
from flask_login import UserMixin
@login_manager.user_loader
def load_user(worker_id):
    return Worker.query.get(int(worker_id))
class Worker(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable= False)
    email = db.Column(db.String(50), nullable= False)
    password = db.Column(db.String(50), nullable= False)
    packages=db.relationship('Package',backref='author',lazy=True)
    price1=db.Column(db.Integer, nullable= False, default=40)
    price2=db.Column(db.Integer, nullable= False, default=44)
    price3=db.Column(db.Integer, nullable= False, default=48)
    price4=db.Column(db.Integer, nullable= False, default=52)
    price5=db.Column(db.Integer, nullable= False, default=54)
    price6=db.Column(db.Integer, nullable= False, default=64)
class Package(db.Model):
    id = db.Column(db.String(100), nullable= False ,primary_key = True)
    worker_id=db.Column(db.Integer,db.ForeignKey('worker.id'),nullable= False)
    sender_full_name=db.Column(db.String(50), nullable= False)
    sender_cin=db.Column(db.String(15), nullable= False)
    sender_adress=db.Column(db.String(100), nullable= False)
    sender_phonenumber=db.Column(db.String(100), nullable= False)
    resever_full_name=db.Column(db.String(50), nullable= False)
    resever_cin=db.Column(db.String(15), nullable= False)
    resever_adress=db.Column(db.String(100), nullable= False)
    resever_phonenumber=db.Column(db.String(100), nullable= False)
    weight=db.Column(db.Integer,nullable= False)
    sms = db.Column(db.Boolean, default=False, nullable=False)
    recept=db.Column(db.Boolean, default=False, nullable=False)
    type=db.Column(db.String(100), nullable= False)
    bank=db.Column(db.String(100))
    checknumber=db.Column(db.String(100))
    package_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
