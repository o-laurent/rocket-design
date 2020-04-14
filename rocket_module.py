import pandas as pd

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
        self.diameter = data['Diameter [m]']
        self.lift_off_mass = data['Lift-off mass [tons]']
        self.payload_mass = data['Payload mass [kg]']
        self.S1length = data['S1 length [m]']
        self.S1diameter = data['S1 diameter [m]']
        self.S1thrust = data['S1 thrust [kN]']
        self.S1isp = data['S1 Isp [s]']
        self.S1m_0 = data['S1 M0 [tons]']
        self.S1m_p = data['S1 Mp [tons]']
        self.S2length = data['S2 length [m]']
        self.S2diameter = data['S2 diameter [m]']
        self.S2thrust = data['S2 thrust [kN]']
        self.S2isp = data['S2 Isp [s]']
        self.S2m_0 = data['S2 M0 [tons]']
        self.S2m_p = data['S2 Mp [tons]']

    def getName(self):
        return self.name

    def getS1Geometry(self):
        return [self.S1length, self.S1diameter]

    def getS2Geometry(self):
        return [self.S2length, self.S2diameter] 

    def add2db(self):
        data = pd.DataFrame([[self.name,
                        self.year,
                        self.country,
                        self.mission,
                        self.stage_number,
                        self.height,
                        self.diameter,
                        self.lift_off_mass,
                        self.payload_mass,
                        self.S1length,
                        self.S1diameter,
                        self.S1thrust,
                        self.S1isp,
                        self.S1m_0,
                        self.S1m_p,
                        self.S2length,
                        self.S2diameter,
                        self.S2thrust,
                        self.S2isp,
                        self.S2m_0,
                        self.S2m_p]], columns = ['Name',
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
        data.to_csv('rocket_database.csv', header=None, mode='a', index=False)


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