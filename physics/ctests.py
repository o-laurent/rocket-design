import unittest
import ctypes 
import os

forces = ctypes.CDLL(os.path.abspath('./forces.so'))
forces.weight.restype = ctypes.c_longdouble 

class TestWeight(unittest.TestCase):
    def test_g0(self):
        #Check that the gravitationnal field has the right value on earth (nearby from 9.81)
        R0 = ctypes.c_longdouble(6371000)
        g0 = 9.81
        a = forces.weight(ctypes.c_longdouble(0), R0)
        self.assertTrue(0.9*g0 <= -a <= 1.1*g0)

# Tester que l'on ne peut pas traverser le sol (doit renvoyer une altitude constante égale au rayon de l'objet)
# Tester que la force en 0 renvoie une erreur
# Tester qu'on s'éloigne bien indéfiniment si on dépasse la vitesse de libérationmy_sum=CDLL('sum.so')

if __name__ == '__main__':
    unittest.main()