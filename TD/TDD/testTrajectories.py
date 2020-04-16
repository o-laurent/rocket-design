import unittest
import pandas as pd

import classes

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
        self.assertEqual(classes.trajectory(data.loc[0]).getName(), 'A') 
    
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
        self.assertRaises(classes.NumberMustBePositive, lambda: classes.trajectory(data.loc[0])) 
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
        self.assertRaises(classes.NumberMustBePositive, lambda: classes.trajectory(data1.loc[0])) 

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
        self.assertRaises(classes.InputError, lambda: (classes.trajectory(data.loc[0])).modifyCenter(data1.loc[0])) 
        
    
if __name__ == '__main__':
    unittest.main()
