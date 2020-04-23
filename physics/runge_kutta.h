#ifndef _RUNGE_KUTTA_H_
#define _RUNGE_KUTTA_H_
#include "structures.h"
bivector* forces (long double t, bivector* X, rocket_data* rocketD);

bivector* linBivector2(long double l1, bivector* vA, 
                    long double l2, bivector* vB);

bivector* linVector5(long double l1, bivector* vA, 
                    long double l2, bivector* vB, 
                    long double l3, bivector* vC, 
                    long double l4, bivector* vD,
                    long double l5, bivector* vE);
#endif