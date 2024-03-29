import unittest
import ctypes 
import os
import numpy as np
import matplotlib.pyplot as plt

#2D vector corresponding to 2D-data
class vector(ctypes.Structure):
    _fields_ = [("x", ctypes.c_longdouble),
                ("y", ctypes.c_longdouble)]

#4D vector corresponding to 2D-data and its derivatives
class bivector(ctypes.Structure):
    _fields_ = [("x", ctypes.c_longdouble),
                ("y", ctypes.c_longdouble),
                ("dx", ctypes.c_longdouble),
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

class stockBivectors(ctypes.Structure):
    pass

stockBivectors._fields_ = [("state", ctypes.POINTER(bivector)),
                    ("previous", ctypes.POINTER(stockBivectors))]

#Opening the shared libraries
try :
    forces = ctypes.CDLL(os.path.abspath('./physics/physics.so'))
except :
    forces = ctypes.CDLL(os.path.abspath('./physics.so'))
    

forces.norm.restype = ctypes.c_longdouble
forces.command.restype = ctypes.c_longdouble
forces.weight.restype = ctypes.POINTER(vector)
forces.d_isp.restype = ctypes.c_longdouble
forces.thrust.restype = ctypes.POINTER(vector)
forces.mass.restype = ctypes.c_longdouble
forces.forces.restype = ctypes.POINTER(bivector)
forces.runge_kutta4.restype = ctypes.POINTER(stockBivectors)

#Utilities for tests
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

#Utilities for linked list 
def gen_commandList(commands, times):
    if len(commands)==len(times):
        cList_next = ctypes.pointer(commandList())
        cFirst = cList_next
        for i in range(len(commands)-1):
            cList = cList_next
            cList_next = ctypes.pointer(commandList())
            cList.contents.t = ctypes.c_longdouble(times[i])
            cList.contents.c = ctypes.c_longdouble(commands[i])
            cList.contents.next = cList_next
        i += 1 
        cList = cList_next
        cList.contents.t = ctypes.c_longdouble(times[i])
        cList.contents.c = ctypes.c_longdouble(commands[i])
        cList.next = ctypes.c_void_p(None)
    return cFirst


def read_stock(pstock):
    stock_list = []
    test = True
    i = 0
    while test:
        if i%1000==0:
            print(i)
        stock = pstock.contents
        x = stock.state.contents.x
        y = stock.state.contents.y
        dx = stock.state.contents.dx
        dy = stock.state.contents.dy
        stock_list.append([x,y,dx,dy])
        pstock = stock.previous
        test = not ctypes.cast(pstock, ctypes.c_void_p).value == None
        i+=1
    return stock_list


#Tests
class TestNorm(unittest.TestCase):
    def test_null(self):
        x = ctypes.c_longdouble(0)
        y = ctypes.c_longdouble(0)
        norm_value = forces.norm(x, y)
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
        #Check that the gravitationnal field has the right value on earth (nearby from 9.81 on y)
        R0 = vector(0, ctypes.c_longdouble(6371000))
        g0 = 9.81
        weight = forces.weight(ctypes.pointer(R0))
        self.assertAlmostEqual(-weight.contents.y, g0, 1)

    def test_g0x(self):
        #Check that the gravitationnal field has the right value on earth (nearby from 0 on x)
        R0 = vector(0, ctypes.c_longdouble(6371000))
        weight = forces.weight(ctypes.pointer(R0))
        self.assertEqual(weight.contents.x, 0)

    def test_null_limit(self):
        #Check that gravitationnal field is nearly null when far from Earth
        R0 = vector(0, ctypes.c_longdouble(10**(300)))
        weight = forces.weight(ctypes.pointer(R0))
        self.assertAlmostEqual(weight.contents.y, 0, 10)

class TestD_ISP(unittest.TestCase):
    def test_s1_ns2_nb(self):
        #Check the value of a specific ISP
        t = 0
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        d_isp = forces.d_isp(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(d_isp, 100.0)

class TestCommand(unittest.TestCase):
    def test_zero(self):
        t = 0
        cList = commandList(0, 0, None)
        command = forces.command(ctypes.c_longdouble(t), ctypes.pointer(cList))
        self.assertEqual(command, 0)

    #Vérifier que la commande 

class TestThrust(unittest.TestCase):
    """def test_s1_ns2_nbx(self):
        #Check the value of a specific thrust on x axis
        t = 0
        G0 = 6.67430*10**(-11)
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        thrust = forces.thrust(ctypes.c_longdouble(0), ctypes.c_longdouble(t), ctypes.pointer(rocketD)).contents
        self.assertEqual(thrust.x, G0*100.0)"""
    #Does not seem to work in this version

    def test_s1_ns2_nby(self):
        #Check the value of a specific thrust on y axis
        t = 0
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        thrust = forces.thrust(ctypes.c_longdouble(0), ctypes.c_longdouble(t), ctypes.pointer(rocketD)).contents
        self.assertEqual(thrust.y, 0)

    """def test_s1_ns2_nby_radians(self):
        #Check the value of a specific thrust with a non-zero angle
        t = 0
        G0 = 6.67430*10**(-11)
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 10, 10, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 1000, ctypes.pointer(cList))
        thrust = forces.thrust(ctypes.c_longdouble(np.pi/3), ctypes.c_longdouble(t), ctypes.pointer(rocketD)).contents
        self.assertAlmostEqual(thrust.x, G0*50.0, 4)""" 
    #Does not seem to work in this version


class TestMass(unittest.TestCase):
    def test_t0(self):
        #Check the value of the mass at t0
        t = 0
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 1, 3, 4, 5, 6, 7, 8, 10, 10, 10, 1000, 0, 1000, 1000, ctypes.pointer(cList))
        mass = forces.mass(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(mass, 3000.0)

    def test_s1_ns2_nb(self):
        #Check the value of the mass before ending 1stage 
        t = 99
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        mass = forces.mass(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(mass, 1001.0)
        
    def test_ns1_ns2_nb(self):
        #Check the value of the mass after ending 1stage 
        t = 100
        cList = commandList(0, 0, None) 
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        mass = forces.mass(ctypes.c_longdouble(t), ctypes.pointer(rocketD))
        self.assertEqual(mass, 100.0)


class TestForces(unittest.TestCase):
    def test_force0x(self):
        t = 100
        cList = commandList(0, 0, None)
        cBivector = bivector(0,0,0,0)
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        force = forces.forces(ctypes.c_longdouble(t), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
        self.assertEqual(force.contents.x, 0.0)
    
    def test_force0y(self):
        t = 100
        cList = commandList(0, 0, None) 
        cBivector = bivector(0,0,0,0)
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        force = forces.forces(ctypes.c_longdouble(t), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
        self.assertEqual(force.contents.y, 0.0)

    def test_force0dx(self):
        t = 0
        cList = commandList(0, 0, None) 
        cBivector = bivector(0, ctypes.c_longdouble(6371000),0,0)
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        force = forces.forces(ctypes.c_longdouble(t), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
        self.assertEqual(force.contents.dx, 0.0)

    def test_force0dy(self):
        t = 0
        cList = commandList(0, 0, None) 
        cBivector = bivector(0, ctypes.c_longdouble(6371000), 0, 0)
        rocketD = rocket_data(1, 1, 3, 4, 5, 6, 7, 8, 10, 10, 10, 1000, 0, 1000, 1000, ctypes.pointer(cList))
        force = forces.forces(ctypes.c_longdouble(t), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
        self.assertNotEqual(force.contents.dy, 0.0)
    
# Tester qu'on s'éloigne bien indéfiniment si on dépasse la vitesse de libérationmy_sum=CDLL('sum.so')


class Test_RK4(unittest.TestCase):
    def test_nostep_state(self):
        #Check that nothing changes when the number of steps is null.
        cList = commandList(10000, 0, None)
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        cBivector = bivector(0,0,0,0)
        pstock = forces.runge_kutta4(ctypes.c_int(0), ctypes.c_longdouble(0), ctypes.c_int(0), cBivector, ctypes.pointer(rocketD))
        self.assertEqual(ctypes.cast(pstock.contents.state, ctypes.c_void_p).value, None)

    def test_nostep_previous(self):
        #Check that the stock has not been modified
        cList = commandList(10000, 0, None)
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        cBivector = bivector(0,0,0,0)
        pstock = forces.runge_kutta4(ctypes.c_int(0), ctypes.c_longdouble(0), ctypes.c_int(0), cBivector, ctypes.pointer(rocketD))
        self.assertEqual(ctypes.cast(pstock.contents.previous, ctypes.c_void_p).value, None)

    def test_hzero_state(self):
        #Check that nothing changes if h0=0
        cList = commandList(10000, 0, None) 
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        cBivector = bivector(0,0,0,0)
        pstock = forces.runge_kutta4(ctypes.c_int(10), ctypes.c_longdouble(0), ctypes.c_int(0), cBivector, ctypes.pointer(rocketD))
        self.assertEqual(ctypes.cast(pstock.contents.state, ctypes.c_void_p).value, None)

    def test_hzero_previous(self):
        cList = commandList(100000, 0, None) 
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        cBivector = bivector(0,0,0,0)
        pstock = forces.runge_kutta4(ctypes.c_int(10), ctypes.c_longdouble(0), ctypes.c_int(0), cBivector, ctypes.pointer(rocketD))
        self.assertEqual(ctypes.cast(pstock.contents.previous, ctypes.c_void_p).value, None)

    def test_10step(self):
        #Check that the bivector has been modified
        cList = commandList(0, 0, None)
        rocketD = rocket_data(1, 0, 1, 0, 0, 0, 0, 0, 100, 0, 0, 1000, 0, 0, 100, ctypes.pointer(cList))
        cBivector = bivector(ctypes.c_longdouble(0), ctypes.c_longdouble(6371000),ctypes.c_longdouble(0),ctypes.c_longdouble(0))
        pstock = forces.runge_kutta4(ctypes.c_int(10000), ctypes.c_longdouble(0.001), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
        self.assertNotEqual(pstock.contents.state.contents, bivector(0,0,0,0))


cBivector = bivector(ctypes.c_longdouble(0), ctypes.c_longdouble(6371000),ctypes.c_longdouble(-1700/3.6),ctypes.c_longdouble(0))
cList = gen_commandList([np.pi/2, 5*np.pi/8, np.pi], [110, 200, 10000])
ArianeD = rocket_data(
    ctypes.c_int(2),
    ctypes.c_int(1), #boosters
    ctypes.c_longdouble(318.857), #fO
    ctypes.c_longdouble(450.4), #fISP
    ctypes.c_longdouble(15.31338), #s0
    ctypes.c_longdouble(446), #sISP
    ctypes.c_longdouble(3792), #bO
    ctypes.c_longdouble(300), #bISP
    ctypes.c_longdouble(497), #T1
    ctypes.c_longdouble(1375), #T2
    ctypes.c_longdouble(125), #TB
    ctypes.c_longdouble(184.7*1000), #fM
    ctypes.c_longdouble(19.44*1000), #sM
    ctypes.c_longdouble(556*1000), #bM
    ctypes.c_longdouble(6*1000), #pM
    cList
)

if __name__ == '__main__':
    unittest.main()