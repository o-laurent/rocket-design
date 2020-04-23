import unittest
import ctypes 
import os
import numpy as np

#2D vector corresponding to 2D-data
class vector(ctypes.Structure):
    _fields_ = [("x", ctypes.c_longdouble),
                ("y", ctypes.c_longdouble)]

#4D vector corresponding to 2D-data and its derivatives
class bivector(ctypes.Structure):
    _fields_ = [("x", ctypes.c_longdouble),
                ("dx", ctypes.c_longdouble),
                ("y", ctypes.c_longdouble),
                ("dy", ctypes.c_longdouble)]

#Struct containing the heading
class commandList(ctypes.Structure):
    pass

commandList._fields_ = [("t", ctypes.c_longdouble),
                ("c", ctypes.c_longdouble),
                ("next", ctypes.POINTER(commandList))]

class rocket_data(ctypes.Structure):
    _fields_ = [("stageNumber", ctypes.c_int),
                ("boosters", ctypes.c_int),
                ("fO", ctypes.c_longdouble),
                ("fISP", ctypes.c_longdouble),
                ("sO", ctypes.c_longdouble),
                ("sISP", ctypes.c_longdouble),
                ("bO", ctypes.c_longdouble),
                ("bISP", ctypes.c_longdouble),
                ("T1", ctypes.c_longdouble),
                ("T2", ctypes.c_longdouble),
                ("TB", ctypes.c_longdouble),
                ("fM", ctypes.c_longdouble),
                ("sM", ctypes.c_longdouble),
                ("pM", ctypes.c_longdouble),
                ("cList", commandList)]

try :
    forces = ctypes.CDLL(os.path.abspath('./physics/forces.so'))
except :
     forces = ctypes.CDLL(os.path.abspath('./forces.so'))

forces.norm.restype = ctypes.c_longdouble
forces.command.restype = ctypes.c_longdouble
forces.weight.restype = ctypes.POINTER(vector)
forces.d_isp.restype = ctypes.c_longdouble
forces.thrust.restype = ctypes.POINTER(vector)
forces.mass.restype = ctypes.c_longdouble
forces.forces.restype = ctypes.POINTER(bivector)
def is_almost_equal(first, second, places):
    if first == second: 
        return True
    else:
        cut_first = round(first, places)
        cut_second = round(second, places)
    return cut_first == cut_second

def list_almost_equal(first, second, places):
    boolean = True
    i = 0
    while boolean and i < len(first) and i < len(second):
        boolean = is_almost_equal(first[0], second[0], places)
    return boolean

class TestNorm(unittest.TestCase):
    def test_null(self):
        x = 0
        y = 0
        norm_value = forces.norm(x,y)
        self.assertEqual(norm_value, 0)

    def test_pos(self):
        first = np.random.randn(1000)*1000000-500000
        second = np.random.randn(1000)*1000000-500000
        self.assertTrue(list_almost_equal)

class TestWeight(unittest.TestCase):
    def test_g0y(self):
        #Check that the gravitationnal field has the right value on earth (nearby from 9.81)
        R0 = vector(0, ctypes.c_longdouble(6371000))
        g0 = 9.81
        a = forces.weight(ctypes.pointer(R0))
        print(a)
        self.assertTrue(0.9*g0 <= -a.contents.y <= 1.1*g0)

    def test_g0x(self):
        #Check that the gravitationnal field has the right value on earth (nearby from 9.81)
        R0 = vector(0, ctypes.c_longdouble(6371000))
        a = forces.weight(ctypes.pointer(R0))
        self.assertTrue(-0.1 <= a.contents.x <= 0.1)

# Tester que l'on ne peut pas traverser le sol (doit renvoyer une altitude constante égale au rayon de l'objet)
# Tester que la force en 0 renvoie une erreur

class TestThrust(unittest.TestCase):
    -1


class TestMass(unittest.TestCase):
    -1


class TestForces(unittest.TestCase):
    -1
# Tester qu'on s'éloigne bien indéfiniment si on dépasse la vitesse de libérationmy_sum=CDLL('sum.so')

if __name__ == '__main__':
    unittest.main()