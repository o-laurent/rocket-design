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
};

pointVerlet* new_position(pointVerlet* x);

#endif