from flask import Flask,render_template,request
data=[]
app=Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/game', methods=['GET','POST'])
def game():
    if request.form["fname"] and request.form["email"] :
        if request.method=='POST':
            fname = request.form["fname"]
            email = request.form["email"]
            data.append({'fname':fname,'email':email})
            print(data)
            return render_template('game.html' ,player=fname)
    else :
        return render_template('index.html')
if (__name__=="__main__"):
    app.run(debug=True,port=5000)