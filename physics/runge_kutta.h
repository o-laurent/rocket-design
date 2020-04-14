#ifndef _RUNGE_KUTTA_H_
#define _RUNGE_KUTTA_H_
#include "structures.h"
bivector forces(double t, bivector state);
bivector linVector(double l1, bivector* vA, 
                    double l2, bivector* vB);
bivector linVector5(double l1, bivector* vA, 
                    double l2, bivector* vB, 
                    double l3, bivector* vC, 
                    double l4, bivector* vD,
                    double l5, bivector* vE);
#endif