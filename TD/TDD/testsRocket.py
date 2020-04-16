import unittest
import pandas as pd

import classes

class TestRocket(unittest.TestCase):
    def test_add(self):
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
        self.assertEqual(classes.rocket(data.loc[0]).getName(), 'A') 
    
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
        self.assertRaises(classes.NoStageGiven, lambda: classes.rocket(data.loc[0])) 

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
        self.assertRaises(classes.StageNumberIsNaN, lambda: classes.rocket(data.loc[0])) 
    
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
        self.assertRaises(classes.StageNumberNotInInterval, lambda: classes.rocket(data.loc[0])) 
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
        self.assertRaises(classes.StageNumberNotInInterval, lambda: classes.rocket(data.loc[0])) 
    
    
if __name__ == '__main__':
    unittest.main()