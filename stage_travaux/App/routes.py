from flask import render_template,request,session,redirect,flash,url_for
from App.models import Worker , Package
from App import app,db,bcrypt
from flask_login import login_user, current_user, logout_user, login_required
from datetime import timedelta


@app.before_request
def make_session_permanent():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=10)

@app.route('/', methods=['GET','POST'])
def index():
    if current_user.is_authenticated:
        return redirect(url_for('acc'))
    #db.session.add(Worker(username='bella',email='abdobella977@gmail.com',password=bcrypt.generate_password_hash('bella462').decode('utf-8')))
    #db.session.commit()
    print(Worker.query.all())
    if request.method=='POST':
        print(db.session.query(Worker))
        data =Worker.query.filter_by(username=request.form.get('username')).first()
        if not data:
            flash("This user doesn't have an account",'error')
        if data:
            if bcrypt.check_password_hash(data.password,request.form.get('password')):
                flash('You have been logged-in secssefuly','success')
                login_user(data)
                session['id']=data.id
                session['data']={'p1':data.price1,'p2':data.price2,\
                'p3':data.price3,'p4':data.price4,'p5':data.price5,'p6':data.price6}
                return redirect(url_for('acc'))
            else :
                flash("Incorrect password",'error')
                return redirect(url_for('index'))
    return render_template("login.html")
@app.route("/accule")
@login_required
def acc():
    return render_template("acc.html")
@app.route("/create", methods=['GET','POST'])
@login_required
def create():
    id=len(Package.query.all())
    if request.method=='POST':
        post=Package(
                    id='LD'+str(id).zfill(8)+'MA',\
                    sender_full_name=request.form.get('sender_full_name'),\
                    resever_full_name=request.form.get('resever_full_name'),\
                    sender_cin=request.form.get('sender_cin'),\
                    sender_adress=request.form.get('sender_adress'),\
                    resever_cin=request.form.get('resever_cin'),\
                    resever_adress=request.form.get('resever_adress'),\
                    sender_phonenumber='+212'+request.form.get('sender_phonenumber'),\
                    resever_phonenumber='+212'+request.form.get('resever_phonenumber'),\
                    weight=request.form.get('weight'),\
                    type=request.form.get('type'),\
                    sms=request.form.get('ams'),\
                    recept=request.form.get('recept'),\
                    bank=request.form.get('bank'),\
                    checknumber=request.form.get('checknumber'),\
                    author=current_user)
        db.session.add(post)
        db.session.commit()
        flash("Order has been created secssefuly",'success')
        return redirect(url_for('acc'))
    return render_template("create.html", user=session['data'])
@app.route("/Modefy", methods=['GET','POST'])
@login_required
def Modefy():
    if request.method=='POST':
        a=request.form.get('infosearch')
        if a=='id':
            data =Package.query.filter_by(id=request.form.get('search')).all()
        elif a=='worker_id':
            data =Package.query.filter_by(worker_id=request.form.get('search')).all()
        elif a=='sender_full_name':
            data =Package.query.filter_by(sender_full_name=request.form.get('search')).all()
        elif a=='sender_adress':
            data =Package.query.filter_by(sender_adress=request.form.get('search')).all()
        elif a=='sender_cin':
            data =Package.query.filter_by(sender_cin=request.form.get('search')).all()
        elif a=='sender_phonenumber':
            data =Package.query.filter_by(sender_phonenumber=request.form.get('search')).all()
        elif a=='resever_full_name':
            data =Package.query.filter_by(resever_full_name=request.form.get('search')).all()
        elif a=='resever_adress':
            data =Package.query.filter_by(resever_adress=request.form.get('search')).all()
        elif a=='resever_cin':
            data =Package.query.filter_by(resever_cin=request.form.get('search')).all()
        elif a=='resever_phonenumber':
            data =Package.query.filter_by(resever_phonenumber=request.form.get('search')).all()
        elif a=='package_date':
            data =Package.query.filter_by(package_date=request.form.get('search')).all()
        for i in range(len(data)):
            data[i].worker_id=Worker.query.filter_by(id=data[i].worker_id).first().username
        if data:
            return render_template('search.html',data=data)
        flash("package not found",'inv1')
        return redirect(url_for('Modefy'))
    return render_template('search.html',data=False)
@app.route("/logout")
def logout():
    flash("You have been loged out secssefuly",'info')
    logout_user()
    return redirect(url_for('index'))