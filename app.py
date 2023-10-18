from flask import Flask, redirect, request, render_template, url_for
import requests

app = Flask(__name__) #create instance of class Flask

@app.route("/")       #assign fxn to route
def hello_world():
   print("the __name__ of this module is... ")
   print(__name__)
   return "No hablo queso!"

#first game route
@app.route("/one")
def game1():
   return render_template("one.html")

@app.route("/two")
def game2():
   return render_template("two.html")

@app.route("/three")
def game3():
   return render_template("three.html")

@app.route("/four")
def game4():
   return render_template("four.html")

@app.route("/five")
def game5():
   return render_template("five.html")

@app.route("/six")
def game6():
   return render_template("six.html")

@app.route("/seven")
def game7():
   return render_template("seven.html")

@app.route("/eight")
def game8():
   return render_template("eight.html")

@app.route("/nine")
def game9():
   return render_template("nine.html")

@app.route("/ten")
def game10():
   return render_template("ten.html")

if __name__ == "__main__":  # true if this file NOT imported
   app.debug = True        # enable auto-reload upon code change
   app.run()
