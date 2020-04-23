# -*- coding: utf-8 -*-
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
@app.route("/index")

def start():
    return render_template("index.html")

@app.route('/addrocket.html')
@app.route('/addrocket')
def addrocket():
    return render_template("addrocket.html")

@app.route('/api/newrocket', methods = ['POST'])
def api_newrocket():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'
#if __name__ == "__main__":
#    app.run()