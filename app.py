# -*- coding: utf-8 -*-

from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
@app.route("/index")

def start():
    return render_template("index.html")

@app.route('/addrocket.html')
@app.route('/addrocket')
def addrocket():
    return render_template("addrocket.html")

if __name__ == "__main__":
    app.run()