import unittest
import ctypes 
import os
import numpy as np
import math as m 
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
    
#Setting the right response types
forces.norm.restype = ctypes.c_longdouble
forces.command.restype = ctypes.c_longdouble
forces.weight.restype = ctypes.POINTER(vector)
forces.d_isp.restype = ctypes.c_longdouble
forces.thrust.restype = ctypes.POINTER(vector)
forces.mass.restype = ctypes.c_longdouble
forces.forces.restype = ctypes.POINTER(bivector)
forces.runge_kutta4.restype = ctypes.POINTER(stockBivectors)
forces.runge_kutta_J_GTO.restype = ctypes.c_longdouble

#Utilities for linked list 
def gen_commandList(commands, times):
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

def random_cList(N=6):
    times = np.linspace(0, 1375, N+1, endpoint=False).astype(int)[1::]
    commands = np.random.rand(1, N)*2*np.pi - np.pi
    return gen_commandList(list(commands)[0], list(times)), list(commands)[0], list(times)

def print_cList(cList):
    cList2 = ctypes.POINTER(commandList)
    cList2 = cList
    print(cList2.contents.t, cList2.contents.c)
    while ctypes.cast(cList2.contents.next, ctypes.c_void_p).value != None:
        cList2 = cList2.contents.next
        print(cList2.contents.t, cList2.contents.c)

#Utility to read the stock
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

def random_optimizer(N=100000):
    #Initial condition
    cBivector = bivector(ctypes.c_longdouble(0), ctypes.c_longdouble(6371000), ctypes.c_longdouble(-1700/3.6), ctypes.c_longdouble(0))
    stock_Lists = []
    stock_J = []
    for step in range(N):
        if step%100==0:
            print(step)
        ArianeD.cList, commands, times = random_cList(3)
        J = forces.runge_kutta_J_GTO(ctypes.c_int(300), ctypes.c_longdouble(5), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(ArianeD))
        stock_Lists.append([commands, times])
        stock_J.append(J)
    print(min(stock_J))
    i = np.argmin(stock_J)
    ArianeD.cList = gen_commandList(stock_Lists[i][0], stock_Lists[i][1])
    pstock = forces.runge_kutta4(ctypes.c_int(10*300), ctypes.c_longdouble(5), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(ArianeD))
    stock = read_stock(pstock)
    stx = list(map(lambda x : x[0], stock))
    sty = list(map(lambda x : x[1], stock))
    theta = np.linspace(0, 2*np.pi, 100)
    """r = 6371000
    x1 = r*np.cos(theta)
    x2 = r*np.sin(theta)
    fig, ax = plt.subplots(1)
    ax.plot(x1, x2)
    ax.plot(stx[::-1], sty[::-1])
    ax.set_aspect(1)
    fig.savefig("trajectory_optimized.png")"""


def genetic_optimizer(POP_SIZE, DIM, MAX_ITER, RATE, dt=1):
    STOCKQ = []
    #Condition initiale
    cBivector = bivector(ctypes.c_longdouble(0), ctypes.c_longdouble(6371000), ctypes.c_longdouble(-1700/3.6), ctypes.c_longdouble(0))
    Tf = ArianeD.T2
    times = np.linspace(0, Tf+1, DIM+1, endpoint=False).astype(int)[1::]
    i = 0
    Mat_X = np.pi*(np.random.rand(POP_SIZE*4, DIM)*2- 1)
    parent_M = np.zeros((POP_SIZE*4, DIM))
    v_j = np.zeros(POP_SIZE*4)

    for i in range(POP_SIZE*4):
        commands = Mat_X[i]
        parent_M[i] = commands 
        cList = gen_commandList(commands, times)
        ArianeD.cList = cList
        v_j[i] = forces.runge_kutta_J_GTO(ctypes.c_int(1375), ctypes.c_longdouble(5), ctypes.c_int(0), ctypes.pointer(cBivector), ctypes.pointer(ArianeD))
    
    new_parent_j = np.zeros(POP_SIZE)
    new_parent_M = np.zeros((POP_SIZE, DIM))
    STOCK = np.zeros((MAX_ITER+1, POP_SIZE, DIM))
    STOCK_J = np.zeros((MAX_ITER+1, POP_SIZE))

    for epoch in range(MAX_ITER):
        comp = np.partition(v_j.flatten(), POP_SIZE)[POP_SIZE]
        i = 0
        for j in range(POP_SIZE*4):
            if i<=74 and v_j[j]<=comp: #If the cost is lower than the first quartile
                new_parent_j[i] = v_j[j] #Remembering the cost
                new_parent_M[i] = parent_M[j] #and the associated commands
                i += 1

        STOCK[epoch] = new_parent_M
        STOCK_J[epoch] = new_parent_j
        
        #Exchanging the genes
        children_M = np.zeros((POP_SIZE*4, DIM)) #Will contain the future children

        choice_M = np.random.randint(1, POP_SIZE*4+1, POP_SIZE*8)
        doubles = 0
        i = 0
        while i<(POP_SIZE*8+doubles):
            choice_1 = choice_M[i]
            choice_2 = choice_M[i+1]
            father = new_parent_M[choice_1]
            mother = new_parent_M[choice_2]
            if choice_1 != choice_2:
                gene_choice = np.random.randint(0, 2, DIM)
                child = np.zeros(DIM)
                for j in range(DIM):
                    if gene_choice[j] == 1 and np.random.rand()<0.5:
                        child[j] = father[j] + np.random.rand()/10 -0.05
                    else:
                        child[j] = mother[j]
                children_M[(i-doubles+1)/2] = child
            else:
                doubles += 2
                np.append(choice_M, np.random.randint(1, POP_SIZE*4+1, 2))
            i += 2

        length = len(children_M)
        new_parent_M = []
        new_parent_j = []
        true_children_M = np.zeros((length,DIM))
        j_M = np.zeros(length)
        """for k in range(length):
            child = children_M[k]
            vrai_enfant, q = gradient_descent(enfant, 10)
            M_vrai_enfant(1:6, k) = transpose(vrai_enfant)
            M_q(k) = q
        """
        parent_M = true_children_M
        v_j = j_M
    
    #On garde le meilleur quart que l'on am�liore au maximum
    comp = np.partition(v_j.flatten(), POP_SIZE)[POP_SIZE]
    final_parents_j = np.zeros(POP_SIZE)
    final_parents_M = np.zeros((POP_SIZE, DIM))
    i = 0
    for j in range(POP_SIZE*4):
        """if v_j[j] <= comp:
            M_parent_final(:,i), v_parent_final(i) = gradient_descent(M_parent(:,j), 100);
            i = i+1"""
    STOCK[epoch+1] = final_parents_M
    STOCKQ[epoch+1] = final_parents_j