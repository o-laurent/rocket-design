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

def trace_trajectory():
    cBivector = bivector(ctypes.c_longdouble(0), ctypes.c_longdouble(6371000), ctypes.c_longdouble(-1700/3.6), ctypes.c_longdouble(0))
    pstock = forces.runge_kutta4(ctypes.c_int(2000), ctypes.c_longdouble(10), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(ArianeD))
    stock = read_stock(pstock)
    stx = list(map(lambda x : x[0], stock))
    sty = list(map(lambda x : x[1], stock))
    #stdx = list(map(lambda x : x[2], stock))
    #stdy = list(map(lambda x : x[3], stock))
    theta = np.linspace(0, 2*np.pi, 100)
    r = 6371000
    x1 = r*np.cos(theta)
    x2 = r*np.sin(theta)
    fig, ax = plt.subplots(1)
    ax.plot(x1, x2)
    ax.plot(stx[::-1], sty[::-1])
    ax.set_aspect(1)
    fig.savefig("trajectory.png")

trace_trajectory()