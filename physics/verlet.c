#include <stdio.h>
#include <stdlib.h>
#include "verlet.h"

pointVerlet* new_position(pointVerlet* u){
    pointVerlet* v;
    v->x= 2*u->x - u->old_x + u->ax;
    v->y= 2*u->y - u->old_y + u->ay;
    return(v);
}
