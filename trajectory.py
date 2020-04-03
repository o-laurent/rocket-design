class Trajectory:
    """ 
        class which contains every useful info about the trajectory we want to reach (GEO,LEO)
    """

    "Most of the cases it's an elliptic trajectory if it's a cercle we have semi-minor axis = semi-major axis"
    def __init__(self, data):
        self.name = data['Name']
        self.a = data['semi-major axis']  
        self.b = data['semi-minor axis']
        self.centerx = data['X-center coordinate']
        self.centery = data['Y-center coordinate']
        self.centerz = data['Z-center coordinate']
        

    def getName(self):
        return self.name

 