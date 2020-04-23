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
                ("bM", ctypes.c_longdouble),
                ("pM", ctypes.c_longdouble),
                ("cList", ctypes.POINTER(commandList))]


#Opening the shared library
try :
    forces = ctypes.CDLL(os.path.abspath('./physics/forces.so'))
except :
    forces = ctypes.CDLL(os.path.abspath('./physics.so'))

#Modifying the default output of the functions
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
        cut_first = round(float(first), places)
        cut_second = round(float(second), places)
    return cut_first == cut_second

def list_almost_equal(first, second, places):
    boolean = True
    i = 0
    while boolean and i < len(first) and i < len(second):
        boolean = is_almost_equal(first[i], second[i], places)
        i += 1
    return boolean


class TestNorm(unittest.TestCase):
    def test_null(self):
        x = ctypes.c_longdouble(0)
        y = ctypes.c_longdouble(0)
        norm_value = forces.norm(x, y)
        print(norm_value)
        self.assertEqual(norm_value, 0.0)

    def test_pos(self):
        xy = np.random.randn(1000, 2)*100-50
        first = []
        for i in range(1000):
            first.append((xy[i][0]**2+xy[i][1]**2)**(1/2))
        second = []
        for i in range(1000):
            second.append(forces.norm(ctypes.c_longdouble(xy[i][0]), ctypes.c_longdouble(xy[i][1])))
        self.assertTrue(list_almost_equal(first, second, 4))


class TestWeight(unittest.TestCase):
    def test_g0y(self):
        #Check that the gravitationnal field has the right value on earth (nearby from 9.81)
        R0 = vector(0, ctypes.c_longdouble(6371000))
        g0 = 9.81
        weight = forces.weight(ctypes.pointer(R0))
        self.assertAlmostEqual(-weight.contents.y, g0, 1)

    def test_g0x(self):
        #Check that the gravitationnal field has the right value on earth (nearby from 9.81)
        R0 = vector(0, ctypes.c_longdouble(6371000))
        weight = forces.weight(ctypes.pointer(R0))
        self.assertEqual(weight.contents.x, 0)

    def test_null_limit(self):
        R0 = vector(0, ctypes.c_longdouble(10**(300)))
        weight = forces.weight(ctypes.pointer(R0))
        self.assertAlmostEqual(weight.contents.y, 0, 10)

# Tester que l'on ne peut pas traverser le sol (doit renvoyer une altitude constante égale au rayon de l'objet)
# Tester que la force en 0 renvoie une erreur
class TestD_ISP(unittest.TestCase):
    def test_s1_ns2_nb(self):
        t = 0
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        d_isp = forces.d_isp(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(d_isp, 100.0)


class TestThrust(unittest.TestCase):
    def test_s1_ns2_nbx(self):
        t = 0
        G0 = 6.67430*10**(-11)
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        thrust = forces.thrust(ctypes.c_longdouble(0), ctypes.c_longdouble(t), ctypes.pointer(rocketD)).contents
        self.assertEqual(thrust.x, G0*100.0)

    def test_s1_ns2_nby(self):
        t = 0
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        thrust = forces.thrust(ctypes.c_longdouble(0), ctypes.c_longdouble(t), ctypes.pointer(rocketD)).contents
        self.assertEqual(thrust.y, 0)

    def test_s1_ns2_nby_radians(self):
        t = 0
        G0 = 6.67430*10**(-11)
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        thrust = forces.thrust(ctypes.c_longdouble(np.pi/3), ctypes.c_longdouble(t), ctypes.pointer(rocketD)).contents
        self.assertAlmostEqual(thrust.x, G0*50.0, 4)


class TestMass(unittest.TestCase):
    def test_t0(self):
        t = 0
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 1, 3, 4, 5, 6, 7, 8, 10, 10, 10, 1000, 0, 1000, 1000, ctypes.pointer(cList))
        mass = forces.mass(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(mass, 3000.0)

    def test_s1_ns2_nb(self):
        t = 99
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        mass = forces.mass(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(mass, 1001.0)
        
    def test_ns1_ns2_nb(self):
        t = 100
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        mass = forces.mass(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(mass, 100.0)
    #Avec boosters 
    #sans boosters
    #au bout d'un certain temps...


class TestForces(unittest.TestCase):
    -1
# Tester qu'on s'éloigne bien indéfiniment si on dépasse la vitesse de libérationmy_sum=CDLL('sum.so')

if __name__ == '__main__':
    unittest.main()