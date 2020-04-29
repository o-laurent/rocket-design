# -*- coding: utf-8 -*-
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
@app.route("/index")

def start():
    return render_template("index.html")

@app.route('/designrocket.html')
@app.route('/addrodesignrocketcket')
def designrocket():
    return render_template("designrocket.html")

@app.route('/compare-rockets.html')
@app.route('/compare-rockets')
@app.route('/comparerockets.html')
@app.route('/comparerockets')
def comp_rocket():
    return render_template("compare_rocket.html")

@app.route('/trajectory.html')
@app.route('/traj')
def trajectory():
    return render_template("trajectory.html")

@app.route('/api/newrocket', methods = ['POST'])
def api_newrocket():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'

#if __name__ == "__main__":
#    app.run()