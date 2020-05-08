# -*- coding: utf-8 -*-
import pandas as pd
from flask import Flask, render_template, request

app = Flask(__name__)

# Defining the API
@app.route("/")
@app.route("/index")
def start():
    load_db()
    return render_template("index.html")

@app.route('/designrocket.html')
@app.route('/addrodesignrocketcket')
def designrocket():
    load_db()
    return render_template("designrocket.html")


@app.route('/compare_rockets.html')
@app.route('/compare_rockets')
def comprocket():
    load_db()
    return render_template("compare_rockets.html")

@app.route('/trajectory.html')
def trajectory():
    load_db()
    return render_template("trajectory.html")

@app.route('/api/newrocket', methods = ['POST'])
def api_newrocket():
    print(request.is_json)
    content = request.get_json()
    print(content)
    return 'JSON posted'

@app.route('/api/rockets/names', methods = ['GET'])
def api_rocket_names():
    print('inside')
    return {
        "names": get_rocket_names(),
    }, 200

@app.route('/api/rockets/all', methods = ['GET'])
def api_rocket_all():
    print('inside')
    json = rocket_db.to_json()
    print(json)
    return json, 200

@app.route('/api/rockets/byname', methods = ['POST'])
def api_rocket_byname():
    print('inside')
    print(request.get_json())
    json = pd.DataFrame(get_rocket_byname(request.get_json()['name'])).to_json()
    print(json)
    return json, 200

#Utility functions
def load_db():
    global rocket_db
    rocket_db = pd.read_csv('rocket_database.csv')

def get_rocket_names():
    return list(rocket_db['Name'])

def get_rocket_byname(name: str)->list:
    return rocket_db.loc[rocket_db['Name'] == name]