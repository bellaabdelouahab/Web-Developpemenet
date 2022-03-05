from flask import render_template,request,session,redirect,flash,url_for
from sqlalchemy.sql.expression import false, null
from App.models import Worker , Package,Prices
from App import app,db,bcrypt
from flask_login import login_user, current_user, logout_user, login_required
from datetime import timedelta
from App.functions import searchbase, send_email
from random import randint
import json
from flask import jsonify
@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=4)
@app.route('/', methods=['GET','POST'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    '''db.session.add(Worker(username='Admin',cin='jc628946',email='abdobella977@gmail.com',password=bcrypt.generate_password_hash('bella462').decode('utf-8')))
    db.session.add(Prices(active=True))
    db.session.commit()'''
    if request.method=='POST':
        data =Worker.query.filter_by(username=request.form.get('username')).first()
        if not data:
            flash("This user doesn't have an account",'error')
        if data:
            if bcrypt.check_password_hash(data.password,request.form.get('password')):
                flash('You have been logged-in secssefuly','success')
                login_user(data)
                prices=Prices.query.filter_by(active=True).first()
                session['data']={'p1':prices.price1,'p2':prices.price2,\
                'p3':prices.price3,'p4':prices.price4,'p5':prices.price5,'p6':prices.price6}
                session['admin']=False
                if data.id==1:
                    session['admin']=True
                return redirect(url_for('home'))
            else :
                flash("Incorrect password",'error')
                return redirect(url_for('index'))
    return render_template("login.html")
@app.route("/Home", methods=['GET','POST'])
@login_required
def home():
    prices=null
    if session.get('admin')==True:
        prices=db.session.query(Prices)
    Pack=Package.query.all()
    Packages={}
    for i in Pack:
        Packages[str(i.id)]=[i.worker_id,i.id,i.sender_full_name,i.sender_cin,i.sender_adress,i.sender_phonenumber[4:],i.Receiver_full_name,\
                i.Receiver_cin,i.Receiver_adress,i.Receiver_phonenumber[4:],i.package_date,i.weight]
    #taking the largest id
    if len(Pack)>0:
        id=sorted([int(i.id[2:10]) for i in Pack])[-1]+1
    else :
        id=0
    if request.method=='POST':
        print(request.form.get('Delete_package'))
        if request.form.get('Delete_package'):
            Package_change=Package.query.filter_by(id=request.form.get('Delete_package')).first()
            db.session.delete(Package_change)
            flash('Package Has Been Deleted Secsessfully','success')  
        if session.get('olddata'):
            db.session.delete(searchbase('id',session['old_id'])[0])
        if request.form.get('old_id')!='0':
            Package_change=Package.query.filter_by(id=request.form.get('old_id')).first()
            if Package_change:
                db.session.delete(Package_change)
            else:
                flash('This Package Dose Not Exist Refresh Your Browser!!!')
        if request.form.get('sender_full_name'):
            post=Package(
                        id=request.form.get('old_id') if request.form.get('old_id')!='0' else 'LD'+str(id).zfill(8)+'MA',\
                        sender_full_name=request.form.get('sender_full_name'),\
                        Receiver_full_name=request.form.get('Receiver_full_name'),\
                        sender_cin=request.form.get('sender_cin'),\
                        sender_adress=request.form.get('sender_adress'),\
                        Receiver_cin=request.form.get('Receiver_cin'),\
                        Receiver_adress=request.form.get('Receiver_adress'),\
                        sender_phonenumber='+212'+request.form.get('sender_phonenumber'),\
                        Receiver_phonenumber='+212'+request.form.get('Receiver_phonenumber'),\
                        weight=request.form.get('weight'),\
                        type=request.form.get('type'),\
                        sms=True if request.form.get('sms')=='on'else False,\
                        recept=True if request.form.get('recept')else False,\
                        bank=request.form.get('bank'),\
                        checknumber=request.form.get('checknumber'),\
                        author=current_user)
            
            db.session.add(post)
            flash("Order has been created secssefuly",'success')
        db.session.commit()
        return redirect(url_for('home'))
    return render_template("Home.html",admin=session['admin'],prices=prices, user=session['data'],Package=Packages)
@app.route("/Modefy", methods=['GET','POST'])
@login_required
def Modefy():
    if request.method=='POST':
        if(request.form.get('infosearch')):
            data = searchbase(request.form.get('infosearch'),request.form.get('search'))
            if data:
                for i in range(len(data)):
                    data[i].worker_id=Worker.query.filter_by(id=data[i].worker_id).first().username
                return render_template('search.html',data=data)
            flash("package not found",'inv1')
            return redirect(url_for('Modefy'))
        if(request.form.get('modi')):
            olddata = searchbase('id',request.form.get('modi'))
            olddata[0].sender_phonenumber=[0]+olddata[0].sender_phonenumber[4:]
            olddata[0].Receiver_phonenumber=[0]+olddata[0].Receiver_phonenumber[4:]
            session['old_id']=olddata[0].id
            session['olddata']=request.form.get('modi')
            return render_template('modify_package.html',data=olddata[0],user=session['data'])
    return render_template('search.html',data=False)
@app.route("/Support",methods=['GET','POST'])
def support():
    if request.method=='POST':
        print(request.form.get('email_support'),request.form.get('problem_explain'))
        send_email(request.form.get('email_support'),request.form.get('problem_explain'))
        flash('Reppot has been sent seccessfully','success')
    return render_template('support.html')
@app.route("/logout")
def logout():
    flash("Your session has benn timed out",'info')
    logout_user()
    return redirect(url_for('index'))

@app.route("/changepassword" , methods = ['POST' ,'GET'])
def changepassword():
    if request.method == 'POST':
        if request.form.get("test_email"):
            session["test_email"]=request.form.get("test_email")
            test_data = Worker.query.filter_by(email = session["test_email"]).first()
            if test_data:
                session['code_number'] = str(randint(100000,999999))
                session['oldpassword']=test_data.password
                responed=send_email(session["test_email"],session['code_number'])
                if responed:
                    flash("Connection Filed",'error')
                    return redirect(url_for("changepassword"))
                return render_template('forget.html',change=True)
            else:
                flash("This User Don't Have An Account",'warning')
                return render_template("forget.html",change=False)
        if request.form.get("new_password"):
            new_password = request.form.get("new_password")
            if session.get('oldpassword')==new_password:
                flash('new password can not be the old password','warning')
                return redirect(url_for("changepassword"))
            if session['code_number'] != request.form.get("number"):
                flash("code number is false please try again", "warning")
                return redirect(url_for("changepassword"))
            if new_password != request.form.get("con_password"):
                flash("password and confirme password are not the same")
                return redirect(url_for("changepassword"))
            testn_data = Worker.query.filter_by(email = session["test_email"]).first()
            testn_data.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
            db.session.commit()
            flash('your password has been updated successfully', 'success')
            return render_template("login.html")
    return render_template("forget.html",change=False)

@app.route('/<user_score>',methods=['POST'])
def indexout(user_score):
    if request.method == 'POST' :
            new_worker = json.loads(user_score)
            print(new_worker)
            if new_worker['changeingtype']=='add':
                if new_worker['username'] and new_worker['cin'] and new_worker['email'] and new_worker['password']:
                    db.session.add(Worker(username=new_worker['username'],email=new_worker['email'],\
                    password=bcrypt.generate_password_hash(new_worker['password']).decode('utf-8')\
                    ,cin=new_worker['cin']))
                else:
                    return jsonify(False)
            elif new_worker['changeingtype']=='modify_prices':
                if new_worker['priceID']=='new':
                    if new_worker['activate']==True:
                        if (new_worker['p1']=='' or new_worker['p2']=='' or new_worker['p3']=='' or new_worker['p4']=='' or new_worker['p5']=='' or new_worker['p6']=='' ):
                            return jsonify(False)
                        prices=Prices.query.all()
                        for price in prices:
                            price.active=False
                    db.session.add(Prices(active=True,price1=new_worker['p1'],price2=new_worker['p2'],\
                                price3=new_worker['p3'],price4=new_worker['p4'],\
                                price5=new_worker['p5'],price6=new_worker['p6'])) 
                else:
                    prices =Prices.query.filter_by(id=new_worker['priceID']).first()
                    if new_worker['action']=='activate':
                        allprices=Prices.query.all()
                        for price in allprices:
                            price.active=False
                        prices.active=True
                    if new_worker['action']=='del_':
                        db.session.delete(prices)
            elif new_worker['changeingtype']=='del':
                data =Worker.query.filter_by(cin=new_worker['cin']).first()
                if data :
                    related_data=Package.query.filter_by(worker_id=data.id)
                    db.session.delete(data)
                    if related_data:
                        for pack in related_data:
                            pack.Worker_id=1
                else:
                    return jsonify(False)
            else:
                return jsonify(False)
            db.session.commit()
    return jsonify(True)