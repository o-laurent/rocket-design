# -*- coding: utf-8 -*-
import pandas as pd
import rocket_module as rkt_module
import ctypes
from optimizers import random_optimizer, genetic_optimizer, rocket_data
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
    print('in request')
    print(request.get_json())
    req_json_body = request.get_json()
    
    name = req_json_body['name']
    print(name)
    missionParams = req_json_body['missionParams']
    algoParams = req_json_body['algoParams']

    algo = algoParams['algorithm']
    rocketD = name2rocketD(name)

    rocketD.pM = float(missionParams['payloadMass'])
    if algo == "genetic":
        opt_data = genetic_optimizer(rocketD, int(algoParams['popSize']), int(algoParams['dimension']), int(algoParams['iterNb']), int(algoParams['gRate']), int(algoParams['gdSteps']))
    elif algo == "random":
        opt_data = random_optimizer(rocketD, int(algoParams['testNb']), int(algoParams['gdSteps']), int(algoParams['dimension']))
    return opt_data, 200

#Utility functions
def name2rocketD(name: str):
    """
    Returns the rocket_data data structure associated to a specific rocket
    """
    g0 = 9.80665
    rocket = get_rocket_byname(name)
    ind = rocket['Name'].index[0]
    stageNb = int(rocket['Stage number'][ind])
    boosters = int(rocket['B thrust [kN]'][ind] != None)

    #First stage parameters
    fISP = float(rocket['S1 Isp [s]'][ind])
    #print(fISP)
    fF = float(rocket['S1 thrust [kN]'][ind])*1000
    
    fO = fF/(fISP*g0)
    #print(fO)
    T1 = float(rocket['S1 mp [tons]'][ind])*1000/fO
    print(T1)
    fM = float(rocket['S1 m0 [tons]'][ind])*1000
    #print(fM)
    pM = float(rocket['Payload mass [kg]'][ind])
    #print(pM)

    #Second Stage parameters
    if stageNb == 2:
        sF = float(rocket['S2 thrust [kN]'][ind])*1000
        sISP = float(rocket['S2 Isp [s]'][ind])
        #print(sF)
        #print(sISP)
        #print(g0)
        sO = sF/(sISP*g0)
        T2 = float(rocket['S2 mp [tons]'][ind])/sO*1000 + T1
        print(T2)
        sM = float(rocket['S2 m0 [tons]'][ind])*1000
        #print(sM)
    else:
        sO = 0
        sISP = 0
        T2 = 0
        sM = 0

    #Booster parameters 
    if boosters:
        bF = float(rocket['B thrust [kN]'][ind])*1000
        bISP = float(rocket['B Isp [s]'][ind])
        #print(bISP)
        bO = bF/(bISP*g0)
        #print(bO)
        bM = float(rocket['B m0 [tons]'][ind])*1000
        #print(bM)
        TB = float(rocket['B mp [tons]'][ind])*1000/bO
        print(TB)
    else:
        bO = 0
        bISP = 0
        bM = 0
        TB = 0

    return rocket_data(ctypes.c_int(stageNb), ctypes.c_int(boosters), ctypes.c_longdouble(fO), ctypes.c_longdouble(fISP), ctypes.c_longdouble(sO), ctypes.c_longdouble(sISP), ctypes.c_longdouble(bO), ctypes.c_longdouble(bISP), ctypes.c_longdouble(T1), ctypes.c_longdouble(T2), ctypes.c_longdouble(TB), ctypes.c_longdouble(fM), ctypes.c_longdouble(sM), ctypes.c_longdouble(bM), ctypes.c_longdouble(pM), None)

def load_db():
    """
    Loads the database
    """
    global rocket_db
    rocket_db = pd.read_csv('rocket_database.csv')

def get_rocket_names():
    """
    Gets the name of the rockets stored in the database
    """
    return list(rocket_db['Name'])

def get_rocket_byname(name: str)-> pd.DataFrame:
    return rocket_db.loc[rocket_db['Name'] == name]

def add_rocket_db(rocket):
    """
    Add a rocket to the database 
    """
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