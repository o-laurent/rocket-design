#Useful imports
import unittest
import ctypes 
import os
import json
import numpy as np
import math as m 
import matplotlib.pyplot as plt
from progress.bar import IncrementalBar

#Defining C structs
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
    

#Setting the right response types
forces.runge_kutta4.restype = ctypes.POINTER(stockBivectors)
forces.runge_kutta_J_GTO.restype = ctypes.c_longdouble
forces.gradient_descent.restype = ctypes.POINTER(commandList)


#Utilities for linked list 
def gen_commandList(commands: list, times: list):
    cFirst = None
    if len(commands)==len(times):
        cList_next = ctypes.pointer(commandList())
        cFirst = cList_next
        i = 0
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

def random_cList(times: list, gd_dim: int=6, Tf: int=1500):
    commands = np.random.rand(1, gd_dim)*2*np.pi - np.pi
    return gen_commandList(list(commands)[0], times), list(commands)[0]

def print_cList(cList: commandList):
    cList2 = ctypes.POINTER(commandList)
    cList2 = cList
    print(cList2.contents.t, cList2.contents.c)
    while ctypes.cast(cList2.contents.next, ctypes.c_void_p).value != None:
        cList2 = cList2.contents.next
        print(cList2.contents.t, cList2.contents.c)

def cList2array(cList: commandList):
    cList2 = ctypes.POINTER(commandList)
    cList2 = cList
    commands = [cList2.contents.c]
    times = [cList2.contents.t]
    while ctypes.cast(cList2.contents.next, ctypes.c_void_p).value != None:
        cList2 = cList2.contents.next
        commands.append(cList2.contents.c)
        times.append(cList2.contents.t)
    return commands, times

def modPi(cList: commandList, dimension: int):
    """
    Modifies the cList in place 
    Makes c in ]-pi;pi] at all times
    """
    pCrawler = ctypes.POINTER(commandList)
    pCrawler = cList
    for i in range(dimension):
        while not (-np.pi<pCrawler.contents.c<=np.pi):
            pCrawler.contents.c -= 2*np.pi * np.sign(pCrawler.contents.c)
        pCrawler = pCrawler.contents.next
        
#Utility to read the stock
def read_stock(pstock: stockBivectors, skip: int=1):
    print("Reading trajectory...")
    stock_list = []
    test = True
    while test:
        stock = pstock.contents
        x = stock.state.contents.x
        y = stock.state.contents.y
        dx = stock.state.contents.dx
        dy = stock.state.contents.dy
        stock_list.append([x,y,dx,dy])
        pstock = stock.previous
        test = not ctypes.cast(pstock, ctypes.c_void_p).value == None
        j = 1
        while test and j<skip:
            pstock = stock.previous
            j += 1
            test = not ctypes.cast(pstock, ctypes.c_void_p).value == None
    return stock_list

#Utility to build the rocket with its name
def rocket_name2rocketD(rkt_name: str):
    -1
#rocket_characteristics
cList = gen_commandList([0,0,0], [0,0,0])
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

def random_optimizer(rocketD: rocket_data=ArianeD, N: int=10000, gd_steps: int=1000, gd_dim: int=3, gd_step_threshold=10^(-10)):
    """
    Optimizing function :

    INPUT :
    N is the number of tries

    OUTPUT :
    opt_data_json is a JSON string which contains the precision, the associated commands and the trajectory
    """
    #initialization
    Tf = int(rocketD.T2)
    times = np.linspace(0, Tf+1, gd_dim+1, endpoint=False).astype(int)[1::]
    cBivector = bivector(ctypes.c_longdouble(0), ctypes.c_longdouble(6371000), ctypes.c_longdouble(-1700/3.6), ctypes.c_longdouble(0))
    stock_Lists = []
    stock_J = []

    #Random tests
    for step in range(N):
        if step%1000==0:
            print(step)
        
        rocketD.cList, commands = random_cList(times, gd_dim, Tf)
        stock_Lists.append(list(commands))
        J = forces.runge_kutta_J_GTO(ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
        stock_J.append(J)
    print("A minimum has been found ! Its value is ", min(stock_J))
    #Gradient-descent betterment
    ind = np.argmin(stock_J)
    cList = gen_commandList(stock_Lists[ind], times)
    rocketD.cList = cList
    cList = forces.gradient_descent(cList, ctypes.c_uint(gd_dim), ctypes.c_uint(gd_steps), ctypes.c_longdouble(10**(-10)), ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
    modPi(cList, gd_dim)
    opt_commands = list(cList2array(cList)[0])
    rocketD.cList = gen_commandList(opt_commands, times)
    j = forces.runge_kutta_J_GTO(ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
    print("A second minimum has been found ! Its value is ", j)
    opt_value = j
    pstock = forces.runge_kutta4(ctypes.c_int(30*(Tf+1)), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
    stock = read_stock(pstock, 10)

    opt_stock_x = list(map(lambda x : x[0], stock))[::-1]
    opt_stock_y = list(map(lambda x : x[1], stock))[::-1]
    opt_stock_dx = list(map(lambda x : x[2], stock))[::-1]
    opt_stock_dy = list(map(lambda x : x[3], stock))[::-1]
    #Converting to JSON
    opt_data_dict = {
        "value": opt_value,
        "commands": opt_commands,
        "stock_x": opt_stock_x,
        "stock_y": opt_stock_y,
        "stock_dx": opt_stock_dx,
        "stock_dy": opt_stock_dy,
    }
    opt_data_json = json.dumps(opt_data_dict)
    return opt_data_json

def gradient_descent(cList, dimension, gd_step_nb, threshold, rk_step_nb, h0, t_0, init_state, rockedD):
    -1


def genetic_optimizer(rocketD: rocket_data=ArianeD, POP_SIZE: int=50, DIM: int=3, MAX_ITER: int=10, GENERATION_RATE: int=2, FINAL_OPTSTEPS: int=1000):
    """
    Optimizing function :

    INPUT :
    POP_SIZE is the number of people after selection POP_SIZE must be >= 2
    DIM is the dimension of the hypercube ]-pi;pi]^DIM in which we define the command. DIM must be >=2.
    MAX_ITER is the number of iterations of the genetic algorithm
    GENERATION_RATE is the inverse of the selection rate

    OUTPUT :
    opt_data_json is a JSON string which contains the precision, the associated commands and the trajectory
    """
    if POP_SIZE < 2 or DIM < 2 or MAX_ITER < 1 or GENERATION_RATE <= 1:
        print("ERROR. BAD PARAMETERS")
        return -1

    print("Genetic optimizer initializing...")
    cBivector = bivector(ctypes.c_longdouble(0), ctypes.c_longdouble(6371000), ctypes.c_longdouble(-1700/3.6), ctypes.c_longdouble(0))
    Tf = int(rocketD.T2)
    
    times = np.linspace(0, Tf+1, DIM+1, endpoint=False).astype(int)[1::]
    i = 0
    Mat_X = np.pi*(np.random.rand(POP_SIZE*GENERATION_RATE, DIM)*2- 1)
    parent_M = np.zeros((POP_SIZE*GENERATION_RATE, DIM))
    v_j = np.zeros(POP_SIZE*GENERATION_RATE)

    #Generating and computing the cost function for each point
    for i in range(POP_SIZE*GENERATION_RATE):
        commands = Mat_X[i]
        parent_M[i] = commands 
        cList = gen_commandList(commands, times)
        rocketD.cList = cList
        v_j[i] = forces.runge_kutta_J_GTO(ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
    
    #Will contain all the data
    STOCK = np.zeros((MAX_ITER+1, POP_SIZE, DIM))
    STOCK_J = np.zeros((MAX_ITER+1, POP_SIZE))
    
    for epoch in range(MAX_ITER):
        new_parent_j = np.zeros(POP_SIZE)
        new_parent_M = np.zeros((POP_SIZE, DIM))

        print("---------------- epoch", epoch+1, "----------------")
        comp = np.partition(v_j.flatten(), POP_SIZE)[POP_SIZE]
        print("first quantile : ", comp, "minimum :", min(v_j))
        i = 0
        for j in range(POP_SIZE*2):
            if i<=POP_SIZE-1 and v_j[j]<=comp: #If the cost is lower than the first quartile
                new_parent_j[i] = v_j[j] #Remembering the cost
                new_parent_M[i] = parent_M[j] #and the associated commands
                i += 1

        STOCK[epoch] = new_parent_M
        STOCK_J[epoch] = new_parent_j
        
        #Exchanging the genes
        ind = np.argmin(new_parent_j)
        children_M = np.zeros((POP_SIZE*GENERATION_RATE, DIM)) #Will contain the future children
        children_M[0] = new_parent_M[ind] #We keep the minimum so that every epoch has a better minimum 

        choice_M = np.random.randint(0, POP_SIZE, POP_SIZE*2*GENERATION_RATE)
        doubles = 0
        i = 2
        while i<(POP_SIZE*4+doubles):
            choice_1 = choice_M[i]
            choice_2 = choice_M[i+1]
            father = new_parent_M[choice_1]
            mother = new_parent_M[choice_2]
            if choice_1 != choice_2:
                gene_choice = np.random.randint(0, 2, DIM)
                child = np.zeros(DIM)
                for j in range(DIM):
                    #Adding a little random to visit a bigger space
                    if gene_choice[j] == 1:
                        child[j] = father[j] 
                    elif np.random.rand()<0.5:
                        child[j] = father[j] + np.random.rand()/10 -0.05
                    else:
                        child[j] = mother[j]
                
                children_M[(i-doubles+1)//2] = child
            else:
                doubles += 2
                choice_M = np.append(choice_M, np.random.randint(0, POP_SIZE, 2))
            i += 2

        length = len(children_M)
        new_parent_M = []
        new_parent_j = []
        true_children_M = np.zeros((length,DIM))
        j_M = np.zeros(length)
        #Defining the progress bar
        bar = IncrementalBar('Betterment', max = length)
        for k in range(length):
            child = children_M[k]
            cList = gen_commandList(child, times)
            rocketD.cList = cList
            #Optimizing the commands a little
            true_child = forces.gradient_descent(cList, ctypes.c_uint(DIM), ctypes.c_uint(10), ctypes.c_longdouble(10**(-6)), ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
            modPi(true_child, DIM)
            rocketD.cList = true_child
            #Fetching the real value
            j = forces.runge_kutta_J_GTO(ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
            true_children_M[k] = cList2array(true_child)[0]
            j_M[k] = j
            #Advancing the bar
            bar.next()
        bar.finish()
        
        parent_M = true_children_M
        v_j = j_M
    
    #We keep only a part and we optimize it as much as possible
    bar = IncrementalBar('Finalization', max = POP_SIZE//2)
    comp = np.partition(v_j.flatten(), POP_SIZE//2)[POP_SIZE//2]
    final_parents_j = np.zeros(POP_SIZE//2)
    final_parents_M = np.zeros((POP_SIZE//2, DIM))
    i = 0
    for ind in range(POP_SIZE*GENERATION_RATE):
        if v_j[ind]<=comp and i<POP_SIZE//2:
            parent = parent_M[ind]
            cList = gen_commandList(parent, times)
            rocketD.cList = cList
            true_parent = forces.gradient_descent(cList, ctypes.c_uint(DIM), ctypes.c_uint(FINAL_OPTSTEPS), ctypes.c_longdouble(10**(-10)), ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
            rocketD.cList = true_parent
            j = forces.runge_kutta_J_GTO(ctypes.c_int(Tf+1), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
            final_parents_M[i] = cList2array(true_parent)[0]
            final_parents_j[i] = j
            i += 1 
            bar.next()
    bar.finish()
    STOCK[epoch+1] = np.repeat(final_parents_M, 2, axis=0) 
    STOCK_J[epoch+1] = np.repeat(final_parents_j, 2)

    #Fetching useful data
    
    ind = np.argmin(final_parents_j)
    opt_commands = list(final_parents_M[ind])
    opt_value = final_parents_j[ind]

    cList = cList = gen_commandList(opt_commands, times)
    rocketD.cList = cList
    pstock = forces.runge_kutta4(ctypes.c_int(10*(Tf+1)), ctypes.c_longdouble(1), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(rocketD))
    stock = read_stock(pstock)
    opt_stock_x = list(map(lambda x : x[0], stock))[::-1]
    opt_stock_y = list(map(lambda x : x[1], stock))[::-1]
    opt_stock_dx = list(map(lambda x : x[2], stock))[::-1]
    opt_stock_dy = list(map(lambda x : x[3], stock))[::-1]

    #Converting to JSON
    opt_data_dict = {
        "value": opt_value,
        "commands": opt_commands,
        "stock_x": opt_stock_x,
        "stock_y": opt_stock_y,
        "stock_dx": opt_stock_dx,
        "stock_dy": opt_stock_dy,
    }

    opt_data_json = json.dumps(opt_data_dict)
    print("Final command:",final_parents_M[ind])
    print("Final cost value:", final_parents_j[ind])

    return opt_data_json

#genetic_optimizer(ArianeD, 200, 6, 20, 2)