"""
We've built two classes : rocket and trajectory
The three common attributes are the name, the mission it corresponds to and the diameter, which let's say is defined like this : d = 2*a

"""
import numpy 
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

class rocket:
    """ 
        class which contains every useful info about a rocket
    """

    def __init__(self, data):
        
        self.name = data['Name']
        self.year = data['Year']
        self.country = data['Country']
        self.mission = data['Mission']
        if not isinstance(data['Stage number'], numpy.int64):
            raise(StageNumberIsNaN)
        else:
            if not 0<data['Stage number'] <3:
                raise(StageNumberNotInInterval)
            else:
                self.stage_number = data['Stage number']
                self.height = data['Height [m]']
                self.diameter = data['Diameter [m]']
                self.lift_off_mass = data['Lift-off mass [tons]']
                self.payload_mass = data['Payload mass [kg]']
                if 'S1 length [m]' in data or 'S1 thrust [kN]' in data or 'S1 Isp [s]' in data or 'S1 M0 [tons]' in data or 'S1 Mp [tons]' in data:
                    if 'S1 length [m]' in data and 'S1 thrust [kN]' in data and 'S1 Isp [s]' in data and 'S1 M0 [tons]' in data and 'S1 Mp [tons]' in data:
                        self.S1length = data['S1 length [m]']
                        self.S1diameter = data['S1 diameter [m]']
                        self.S1thrust = data['S1 thrust [kN]']
                        self.S1isp = data['S1 Isp [s]']
                        self.S1m_0 = data['S1 M0 [tons]']
                        self.S1m_p = data['S1 Mp [tons]']
                    else:
                        raise(InsufficientInput)
                    if 'S2 length [m]' in data or 'S2 thrust [kN]' in data or 'S2 Isp [s]' in data or 'S2 M0 [tons]' in data or 'S2 Mp [tons]' in data:
                        if 'S2 length [m]' in data and 'S2 thrust [kN]' in data and 'S2 Isp [s]' in data and 'S2 M0 [tons]' in data and 'S2 Mp [tons]' in data:
                            self.S2length = data['S2 length [m]']
                            self.S2diameter = data['S2 diameter [m]']
                            self.S2thrust = data['S2 thrust [kN]']
                            self.S2isp = data['S2 Isp [s]']
                            self.S2m_0 = data['S2 M0 [tons]']
                            self.S2m_p = data['S2 Mp [tons]']
                        else:
                            raise(InsufficientInput)
                else:
                    raise(NoStageGiven)
        

    def getName(self):
        return self.name

    def getS1Geometry(self):
        return [self.S1length, self.S1diameter]

    def getS2Geometry(self):
        return [self.S2length, self.S2diameter] 


class trajectory:
    """ 
        class which contains every useful info about the trajectory we want to reach (GEO,LEO)
    """

    "Most of the cases it's an elliptic trajectory if it's a cercle we have semi-minor axis = semi-major axis"
    def __init__(self, data):
        self.name = data['Name']
        self.mission = data['Mission']
        self.a = data['semi-major axis']
        self.e = data['excentricity']
        self.diameter = data['diameter']
        self.centerx = data['X-center coordinate']
        self.centery = data['Y-center coordinate']
        self.centerz = data['Z-center coordinate']
        

    def getName(self):
        return self.name

    def modifyCenter(self, data):
        try:
            self.centerx = data['X-center coordinate']
            self.centery = data['Y-center coordinate']
            self.centerz = data['Z-center coordinate']
        except:
            raise InputError