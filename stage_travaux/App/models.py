from datetime import datetime
from enum import unique
from sqlalchemy.orm import backref
from App import db, login_manager
from flask_login import UserMixin

@login_manager.user_loader
def load_user(worker_id):
    return Worker.query.get(int(worker_id))

class Worker(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable= False )
    cin = db.Column(db.String(50), nullable= False)
    email = db.Column(db.String(50), nullable= False)
    password = db.Column(db.String(50), nullable= False)
    packages=db.relationship('Package',backref='author',lazy=True)

class Prices(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    active=db.Column(db.Boolean,default=False)
    price1=db.Column(db.Integer, nullable= False, default=40)
    price2=db.Column(db.Integer, nullable= False, default=44)
    price3=db.Column(db.Integer, nullable= False, default=48)
    price4=db.Column(db.Integer, nullable= False, default=52)
    price5=db.Column(db.Integer, nullable= False, default=54)
    price6=db.Column(db.Integer, nullable= False, default=74)
    
class Package(db.Model):
    id = db.Column(db.String(100), nullable= False ,primary_key = True)
    worker_id=db.Column(db.Integer,db.ForeignKey('worker.id'),nullable= False)
    sender_full_name=db.Column(db.String(50), nullable= False)
    sender_cin=db.Column(db.String(15), nullable= False)
    sender_adress=db.Column(db.String(100), nullable= False)
    sender_phonenumber=db.Column(db.String(100), nullable= False)
    Receiver_full_name=db.Column(db.String(50), nullable= False)
    Receiver_cin=db.Column(db.String(15), nullable= False)
    Receiver_adress=db.Column(db.String(100), nullable= False)
    Receiver_phonenumber=db.Column(db.String(100), nullable= False)
    weight=db.Column(db.Integer,nullable= False)
    sms = db.Column(db.Boolean, default=False, nullable=False)
    recept=db.Column(db.Boolean, default=False, nullable=False)
    type=db.Column(db.String(100), nullable= False)
    bank=db.Column(db.String(100),default='')
    checknumber=db.Column(db.String(100),default='')
    package_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
