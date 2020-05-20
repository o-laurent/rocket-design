# -*- coding: utf-8 -*-
import pandas as pd
import rocket_module as rkt_module
from optimizers import random_optimizer, genetic_optimizer
from flask import Flask, render_template, request
import csv

app = Flask(__name__)

# Defining the API
@app.route("/")
@app.route("/index")
def start():
    load_db()
    return render_template("index.html")

@app.route('/designrocket.html')
@app.route('/designrocket')
def designrocketTemplate():
    load_db()
    return render_template("designrocket.html")


@app.route('/compare_rockets.html')
@app.route('/compare_rockets')
def comprocketTemplate():
    load_db()
    return render_template("compare_rockets.html")

@app.route('/optimizing.html')
@app.route('/optimizing')
def optimizeTemplate():
    load_db()
    return render_template("optimizing.html")

@app.route('/trajectory.html')
@app.route('/trajectory')
def trajectory():
    load_db()
    return render_template("trajectory.html")

@app.route('/api/newrocket', methods = ['POST'])
def api_newrocket():
    print(request.is_json)
    rocket = request.get_json()
    add_rocket_db(rocket['rocket'])
    return pd.DataFrame().to_json(), 200

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
    print(request.get_json())
    json = pd.DataFrame(get_rocket_byname(request.get_json()['name'])).to_json()
    print(json)
    return json, 200

@app.route('/api/optimize', methods = ['POST'])
def api_optimize():
    #nom de la fusée 
    """
    req_json_body = request.get_json().body
    name = req_json_body.name
    """
    #paramètres de la mission
    #paramètres de la simulation
    #opt_data = genetic_optimizer()
    opt_data = random_optimizer()
    #print(opt_data)
    return opt_data, 200

#Utility functions
def load_db():
    global rocket_db
    rocket_db = pd.read_csv('rocket_database.csv')

def get_rocket_names():
    return list(rocket_db['Name'])

def get_rocket_byname(name: str)->list:
    return rocket_db.loc[rocket_db['Name'] == name]

def add_rocket_db(rocket):
    print(rocket)
    name = rocket["Name"]
    year = rocket["Year"]
    country = rocket["Country"]
    mission = rocket["Mission"]
    stage_number = rocket["Stage_number"]
    boosters = rocket["Boosters"]
    height = rocket["Height"]
    diameter = rocket["Diameter"]
    lift_off_mass = rocket["Lift_off_mass"]
    payload_mass = rocket["Payload_mass"]
    S1length = rocket["fSheight"]
    S1diameter = rocket["fSdiameter"]
    S1thrust = rocket["fSthrust"]
    S1isp = rocket["fSisp"]
    S1m_0 = rocket["fSm0"]
    S1m_p = rocket["fSmp"]
    fscolor = rocket["fScolor"]
    print(S1length)
    print(S1diameter)
    print(S1thrust)
    print(S1isp)
    print(S1m_0)
    print(S1m_p)
    print(fscolor)
    if boosters:
        blength = rocket["bheight"]
        bdiameter = rocket["bdiameter"]
        bthrust = rocket["bthrust"]
        bisp = rocket["bisp"]
        bm_0 = rocket["bm0"]
        bm_p = rocket["bmp"]
        bcolor = rocket["bcolor"]
        print(blength)
        print(bdiameter)
        print(bthrust)
        print(bisp)
        print(bm_0)
        print(bm_p)
        print(bcolor)
    else:
        blength = ""
        bdiameter = ""
        bthrust = ""
        bisp = ""
        bm_0 = ""
        bm_p = ""
        bcolor = ""

    if stage_number == 2:
        S2length = rocket["fSheight"]
        S2diameter = rocket["fSdiameter"]
        S2thrust = rocket["fSthrust"]
        S2isp = rocket["fSisp"]
        S2m_0 = rocket["fSm0"]
        S2m_p = rocket["fSmp"]
        sscolor = rocket["sScolor"]
        print(S2length)
        print(S2diameter)
        print(S2thrust)
        print(S2isp)
        print(S2m_0)
        print(S2m_p)
        print(sscolor)
    else:
        S2length = ""
        S2diameter = ""
        S2thrust = ""
        S2isp = ""
        S2m_0 = ""
        S2m_p = ""
        sscolor = ""

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
                            S2m_p,
                            blength,
                            bdiameter,
                            bthrust,
                            bisp,
                            bm_0,
                            bm_p,
                            fscolor,
                            bcolor,
                            sscolor]], columns = ['Name',
                        'Year',
                        'Country',
                        'Mission',
                        'Stage number',
                        'Height [m]',
                        'Diameter [m]',
                        'Lift-off mass [tons]',
                        'Payload mass [kg]',
                        'S1 height [m]',
                        'S1 diameter [m]',
                        'S1 thrust [kN]','S1 Isp [s]',
                        'S1 m0 [tons]',
                        'S1 mp [tons]',
                        'B height [m]',
                        'B diameter [m]',
                        'B thrust [kN]','B Isp [s]',
                        'B m0 [tons]',
                        'B mp [tons]',
                        'S2 height [m]',
                        'S2 diameter [m]',
                        'S2 thrust [kN]',
                        'S2 Isp [s]',
                        'S2 m0 [tons]',
                        'S2 mp [tons]',
                        'S1 color',
                        'Booster color',
                        'S2 color'])
    #print(data)
    new_rocket = rkt_module.rocket(data.loc[0,:])
    new_rocket.add2db()