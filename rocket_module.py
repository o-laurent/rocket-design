#Importing modules
import pandas as pd
import unittest
import csv

#Introducing new errors
class InputError(Exception):
    pass

class InsufficientInput(Exception):
    pass

class NoStageGiven(Exception):
    pass

class StageNumberIsNaN(Exception):
    pass

class StageNumberNotInInterval(Exception):
    pass

class NumberMustBePositive(Exception):
    pass


#Defining the major classes
class rocket:
    """ 
        class which contains every useful info about a rocket
    """

    def __init__(self, data):
        self.name = data['Name']
        self.year = data['Year']
        self.country = data['Country']
        self.mission = data['Mission']
        self.stage_number = data['Stage number']
        self.height = data['Height [m]']
        self.lift_off_mass = data['Lift-off mass [tons]']
        self.payload_mass = data['Payload mass [kg]']
        self.S1length = data['S1 height [m]']
        self.S1diameter = data['S1 diameter [m]']
        self.S1thrust = data['S1 thrust [kN]']
        self.S1isp = data['S1 Isp [s]']
        self.S1m_0 = data['S1 m0 [tons]']
        self.S1m_p = data['S1 mp [tons]']
        self.blength = data['B height [m]']
        self.bdiameter = data['B diameter [m]']
        self.bthrust = data['B thrust [kN]']
        self.bisp = data['B Isp [s]']
        self.bm_0 = data['B m0 [tons]']
        self.bm_p = data['B mp [tons]']
        self.S2length = data['S2 height [m]']
        self.S2diameter = data['S2 diameter [m]']
        self.S2thrust = data['S2 thrust [kN]']
        self.S2isp = data['S2 Isp [s]']
        self.S2m_0 = data['S2 m0 [tons]']
        self.S2m_p = data['S2 mp [tons]']
        self.S1color = data['S1 color']
        self.Bcolor = data['Booster color']
        self.S2color = data['S2 color']

    def getName(self):
        return self.name

    def getS1Geometry(self):
        return [self.S1length, self.S1diameter]

    def getS2Geometry(self):
        return [self.S2length, self.S2diameter] 

    def add2db(self):
        print('adding')
        data = pd.DataFrame([[self.name,
                        self.year,
                        self.country,
                        self.mission,
                        self.stage_number,
                        self.height,
                        self.lift_off_mass,
                        self.payload_mass,
                        self.S1length,
                        self.S1diameter,
                        self.S1thrust,
                        self.S1isp,
                        self.S1m_0,
                        self.S1m_p,
                        self.blength,
                        self.bdiameter,
                        self.bthrust,
                        self.bisp,
                        self.bm_0,
                        self.bm_p,
                        self.S2length,
                        self.S2diameter,
                        self.S2thrust,
                        self.S2isp,
                        self.S2m_0,
                        self.S2m_p,
                        self.S1color,
                        self.Bcolor,
                        self.S2color]], columns = ['Name',
                        'Year',
                        'Country',
                        'Mission',
                        'Stage number',
                        'Height [m]',
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
        print(data)

        data1 = pd.read_csv('rocket_database.csv')
        names = list(data1['Name'])
        #edit if two rockets share the same name
        if data['Name'][0] in names:
            data1 = data1[data1['Name'] != data['Name'][0]]
            print(data)
        data = pd.concat([data1, data])
        data.sort_values(by=['Year'])
        data.to_csv('rocket_database.csv', index=False)


class trajectory:
    """ 
        class which contains every useful info about the trajectory we want to reach (GEO,LEO)
    """

    "Most of the cases it's an elliptic trajectory if it's a cercle we have semi-minor axis = semi-major axis"
    def __init__(self, data):
        self.name = data['Name']
        self.a = data['semi-major axis']
        self.e = data['excentricity']
        self.centerx = data['X-center coordinate']
        self.centery = data['Y-center coordinate']
        self.centerz = data['Z-center coordinate']
        

    def getName(self):
        return self.name

#Adding tests
class TestRocket(unittest.TestCase):
    #Do not work in this version (we changed the structure of the database)
    -1
    """def test_add(self):
        data = pd.DataFrame([['A',2020,'France','LEO',2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]], 
                                            columns = ['Name',
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
        self.assertEqual(rocket(data.loc[0]).getName(), 'A') 
    
    def test_no_stage(self):
        data = pd.DataFrame([['A',2020,'France','LEO',1,1,1,1,1]], 
                                            columns = ['Name',
                                                    'Year',
                                                    'Country',
                                                    'Mission',
                                                    'Stage number',
                                                    'Height [m]',
                                                    'Diameter [m]',
                                                    'Lift-off mass [tons]',
                                                    'Payload mass [kg]'])
        self.assertRaises(NoStageGiven, lambda: rocket(data.loc[0])) 

    def test_stage_NAN(self):
        data = pd.DataFrame([['A',2020,'France','LEO','A',1,1,1,1]], 
                                            columns = ['Name',
                                                    'Year',
                                                    'Country',
                                                    'Mission',
                                                    'Stage number',
                                                    'Height [m]',
                                                    'Diameter [m]',
                                                    'Lift-off mass [tons]',
                                                    'Payload mass [kg]'])
        self.assertRaises(StageNumberIsNaN, lambda: rocket(data.loc[0])) 
    
    def test_stage_NotInInterval(self):
        data = pd.DataFrame([['A',2020,'France','LEO',3,1,1,1,1]], 
                                            columns = ['Name',
                                                    'Year',
                                                    'Country',
                                                    'Mission',
                                                    'Stage number',
                                                    'Height [m]',
                                                    'Diameter [m]',
                                                    'Lift-off mass [tons]',
                                                    'Payload mass [kg]'])
        self.assertRaises(StageNumberNotInInterval, lambda: rocket(data.loc[0])) 
        data = pd.DataFrame([['A',2020,'France','LEO',0,1,1,1,1]], 
                                            columns = ['Name',
                                                    'Year',
                                                    'Country',
                                                    'Mission',
                                                    'Stage number',
                                                    'Height [m]',
                                                    'Diameter [m]',
                                                    'Lift-off mass [tons]',
                                                    'Payload mass [kg]'])
        self.assertRaises(StageNumberNotInInterval, lambda: rocket(data.loc[0])) """

class TestTrajectory(unittest.TestCase):
    def test_add(self):
        data = pd.DataFrame([['A','LEO',1,1,1,1,1,1,1]], 
                                            columns = ['Name',
                                                    'Mission',
                                                    'Semi-major axis',
                                                    'Semi-minor axis',
                                                    'Excentricity',
                                                    'Diameter',
                                                    'X-center coordinate',
                                                    'Y-center coordinate',
                                                    'Z-center coordinate'])
        self.assertEqual(trajectory(data.loc[0]).getName(), 'A') 
    
    def test_positivity(self):
        data = pd.DataFrame([['A','LEO',-1,1,1,1,1,1,1]], 
                                            columns = ['Name',
                                                    'Mission',
                                                    'Semi-major axis',
                                                    'Semi-minor axis',
                                                    'Excentricity',
                                                    'Diameter',
                                                    'X-center coordinate',
                                                    'Y-center coordinate',
                                                    'Z-center coordinate'])
        self.assertRaises(NumberMustBePositive, lambda: trajectory(data.loc[0])) 
        data1 = pd.DataFrame([['A','LEO',1,-1,1,1,1,1,1]], 
                                            columns = ['Name',
                                                    'Mission',
                                                    'Semi-major axis',
                                                    'Semi-minor axis',
                                                    'Excentricity',
                                                    'Diameter',
                                                    'X-center coordinate',
                                                    'Y-center coordinate',
                                                    'Z-center coordinate'])
        self.assertRaises(NumberMustBePositive, lambda: trajectory(data1.loc[0])) 

    def test_modify_center(self): 
        data = pd.DataFrame([['A','LEO',1,1,1,1,1,1,1]], 
                                            columns = ['Name',
                                                    'Mission',
                                                    'Semi-major axis',
                                                    'Semi-minor axis',
                                                    'Excentricity',
                                                    'Diameter',
                                                    'X-center coordinate',
                                                    'Y-center coordinate',
                                                    'Z-center coordinate'])
        data1 = pd.DataFrame([['A','LEO',1,1,1,1]], 
                                            columns = ['Name',
                                                    'Mission',
                                                    'Semi-major axis',
                                                    'Semi-minor axis',
                                                    'Excentricity',
                                                    'Diameter'])
        self.assertRaises(InputError, lambda: (trajectory(data.loc[0])).modifyCenter(data1.loc[0])) 
