from flask import Flask,render_template
import api_contries
b=api_contries.get_country()
app = Flask(__name__)
@app.route("/")
def index():
    return render_template('Main_page.html')
@app.route("/covid-19")
def covpage():
    return render_template('Home_page.html',countries=b)
@app.route("/about")
def about():
    return render_template("About_page.html")
if (__name__ == '__main__'):
    app.run(debug=True,port=5101)