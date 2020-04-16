import pandas as pd
import rocket_module as rkt_module

rocket_list = []


def importDB(rocket_list):
    rocket_df = pd.read_csv('rocket_database.csv')
    index = list(rocket_df.index)
    for ind in index:
        rocket_list.append(rkt_module.rocket(rocket_df.loc[ind,:]))



def add_rocket_terminal():
    name = input('Enter the name of the rocket: ')
    year = input('Enter the launch year of the rocket: ')
    country = input('Enter the country which built rocket: ')
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
    return data
