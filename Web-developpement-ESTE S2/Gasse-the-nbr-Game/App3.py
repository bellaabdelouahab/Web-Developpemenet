from flask import Flask,render_template
from random import randint
app=Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/game', methods=['GET','POST'])
def game():
    return render_template('game.html' )
if (__name__=="__main__"):
    app.run(debug=True,port=5000)