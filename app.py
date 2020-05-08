# -*- coding: utf-8 -*-
import pandas as pd
import rocket_module as rkt_module
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
    rocket = request.get_json()
    add_rocket_db(rocket)
    print(content)
    return None,200

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

def add_rocket_db(rocket):
    name = input('Enter the name of the rocket: ')
    year = input('Enter the launch year of the rocket: ')
    country = input('Enter the country which builds the rocket: ')
    mission = input('Enter the rocket mission: ') 
    stage_number = int(input('Enter the number of stages: '))
    height = int(input('Enter the total height of the rocket: '))
    diameter = int(input('Enter the total diameter of the rocket: '))
    lift_off_mass = int(input('Enter the lift-off mass of the rocket: '))
    payload_mass = int(input('Enter the paiload mass of the rocket: '))
    if stage_number >= 1:
        S1length = int(input('Enter the length of the first stage: '))
        S1diameter = int(input('Enter the diameter of the first stage: '))
        S1thrust = int(input('Enter the thrust of the first stage: '))
        S1isp = int(input('Enter the ISP of the first stage: '))
        S1m_0 = int(input('Enter the initial mass of the first stage: '))
        S1m_p = int(input('Enter the propellant mass of the first stage: '))
    if stage_number >= 2:
        S2length = int(input('Enter the length of the second stage: '))
        S2diameter = int(input('Enter the diameter of the second stage: '))
        S2thrust = int(input('Enter the thrust of the second stage: '))
        S2isp = int(input('Enter the ISP of the second stage: '))
        S2m_0 = int(input('Enter the initial mass of the second stage: '))
        S2m_p = int(input('Enter the propellant mass of the second stage: '))
        data = pd.DataFrame([[name,
                            year,
                            country,
                            mission,
                            stage_number,
                            height,
                            diameter,
                            lift_off_mass,
                            payload_mass,
                            S1length,
                            S1diameter,
                            S1thrust,
                            S1isp,
                            S1m_0,
                            S1m_p,
                            S2length,
                            S2diameter,
                            S2thrust,
                            S2isp,
                            S2m_0,
                            S2m_p]], columns = ['Name',
                        'Year',
                        'Country',
                        'Mission',
                        'Stage number',
                        'Height [m]',
                        'Diameter [m]',
                        'Lift-off mass [tons]',
                        'Payload mass [kg]',
                        'S1 length [m]',
                        'S1 diameter [m]',
                        'S1 thrust [kN]','S1 Isp [s]',
                        'S1 M0 [tons]',
                        'S1 Mp [tons]',
                        'S2 length [m]',
                        'S2 diameter [m]',
                        'S2 thrust [kN]',
                        'S2 Isp [s]',
                        'S2 M0 [tons]',
                        'S2 Mp [tons]'])
    new_rocket = rkt_module.rocket(data.loc[0,:])
    new_rocket.add2db()