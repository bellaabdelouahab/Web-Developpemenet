from flask import Flask,render_template,request
app = Flask(__name__)
@app.route('/')
def index():
    return render_template("base.html")
data=[]
@app.route('/Contact', methods=["GET","POST"])
def contact():
    if (request.method=="POST"):
        fname = request.form["fname"]
        lname = request.form["lname"]
        data.append({'fname':fname,'lname':lname})
        return render_template("Contact.html", data=data)
    return render_template('Contact.html')
if (__name__=="__main__"):
    app.run(debug=True,port=5000)