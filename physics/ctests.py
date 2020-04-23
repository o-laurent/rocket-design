import unittest
import ctypes 
import os


class vector(ctypes.Structure):
    _fields_ = [("x", ctypes.c_longdouble),
                ("y", ctypes.c_longdouble)]

class bivector(ctypes.Structure):
    _fields_ = [("x", ctypes.c_longdouble),
                ("dx", ctypes.c_longdouble),
                ("y", ctypes.c_longdouble),
                ("dy", ctypes.c_longdouble)]

try :
    forces = ctypes.CDLL(os.path.abspath('./physics/forces.so'))
except :
     forces = ctypes.CDLL(os.path.abspath('./forces.so'))
forces.weight.restype = ctypes.POINTER(vector)

class TestNorm(unittest.TestCase):
    -1

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