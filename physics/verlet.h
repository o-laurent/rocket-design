#ifndef _VERLET_H_
#define _VERLET_H_
#include "structures.h"
typedef struct pointVerlet pointVerlet;
struct pointVerlet{
    double x;
    double old_x;
    double y;
    double old_y;
    double ax;
    double ay;
    double m;
};

pointVerlet* new_m(pointVerlet* u,double M);
pointVerlet* new_position(pointVerlet* x);
pointVerlet* new_acceleration(pointVerlet* u);
stockBivectors* verlet (bivector* init_state1, bivector* init_state2);


#endif