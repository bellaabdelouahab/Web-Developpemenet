from flask import Flask,render_template,request,session,redirect,flash
from flask.helpers import url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import login_user, current_user, logout_user, login_required,LoginManager
#from Email import send_email
from flask_login import UserMixin
from datetime import datetime
app= Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///testDB'
db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.login_message_category = 'info'
@login_manager.user_loader
def load_user(worker_id):
    return Worker.query.get(int(worker_id))
class Worker(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable= False)
    email = db.Column(db.String(50), nullable= False)
    password = db.Column(db.String(50), nullable= False)
    packages=db.relationship('Package',backref='author',lazy=True)
    def __repr__(self):
        return f"Worker('{self.id}','{self.username}','{self.email}','{self.password}')"
class Package(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    worker_id=db.Column(db.Integer,db.ForeignKey('worker.id'),nullable= False)
    sender_full_name=db.Column(db.String(50), nullable= False)
    sender_cin=db.Column(db.String(15), nullable= False)
    sender_adress=db.Column(db.String(100), nullable= False)
    sender_phonenumber=db.Column(db.String(100), nullable= False)
    resever_full_name=db.Column(db.String(50), nullable= False)
    resever_cin=db.Column(db.String(15), nullable= False)
    resever_adress=db.Column(db.String(100), nullable= False)
    resever_phonenumber=db.Column(db.String(100), nullable= False)
    type=db.Column(db.String(100), nullable= False)
    options=db.Column(db.String(100), nullable= False)
    package_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    def __repr__(self):
        return f"package('{self.id}','{self.worker_id}','{self.type}','{self.options}','{self.package_date}')"
@app.route('/', methods=['GET','POST'])
def index():
    #db.session.add(Worker(username='bella',email='abdobella977@gmail.com',password='bella462'))
    #db.session.commit()
    print(Worker.query.all())
    if request.method=='POST' :
        if request.form.get('username') and request.form.get('password'):
            session['username']=request.form.get('username')
            session['password']=request.form.get('password')
            print(db.session.query(Worker))
            data =Worker.query.filter_by(username=session['username']).first()
            session['id']=data.id
            print(data)
            if  data :
                if not data.password==session['password']:
                    flash("Incorrect password",'inv2')
                    return redirect(url_for('index'))
                flash('You have been logged-in secssefuly')
                login_user(data)
                return redirect(url_for('acc'))
            else :
                flash("This user doesn't have an account",'inv3')
                return redirect(url_for('index'))
        return redirect(url_for('acc'))
    return render_template("login.html")
@app.route("/accule")
def acc():
    print(Package.query.all())
    return render_template("acc.html")
@app.route("/create", methods=['GET','POST'])
@login_required
def create():
    if request.method=='POST':
        post=Package(sender_full_name=request.form.get('sender_full_name'),resever_full_name=request.form.get('resever_full_name'),sender_cin=request.form.get('sender_cin'),sender_adress=request.form.get('sender_adress'),resever_cin=request.form.get('resever_cin'),resever_adress=request.form.get('resever_adress'),sender_phonenumber=request.form.get('sender_phonenumber'),resever_phonenumber=request.form.get('resever_phonenumber'),type=request.form.get('type'),options=request.form.get('options'),author=current_user)
        db.session.add(post)
        db.session.commit()
        flash("Order has been created secssefuly")
        return redirect(url_for('acc'))
    return render_template("create.html")
@app.route("/Modefy", methods=['GET','POST'])
@login_required
def Modefy():
    if request.method=='POST':
        session['p_id']=int(request.form.get('search'))
        data =Package.query.filter_by(id=session['p_id']).all()
        print(data)
        if data:
            print("ddddddddddddddd")
            print(data[0].id)
            return render_template('search.html',data=data)
        print('really')
        flash("package not found",'inv1')
        return redirect(url_for('Modefy'))
    return render_template('search.html',data=False)
if (__name__=="__main__"):
    app.run(debug=True,port=5001)
    