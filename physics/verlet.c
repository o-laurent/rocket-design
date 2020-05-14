#include <stdio.h>
#include <stdlib.h>
#include "verlet.h"
#include "forces.h"
//function that gives the new weight
pointVerlet* new_m(pointVerlet* u,double M){
    u->m=M;
}
//function that gives the new position
pointVerlet* new_position(pointVerlet* u){
    pointVerlet* v;
    v->old_x=u->x;
    v->old_y=u->y;
    v->x= 2*u->x - u->old_x + u->ax;
    v->y= 2*u->y - u->old_y + u->ay;
    return(v);
}
//function that gives the new acceleration
pointVerlet* new_acceleration(pointVerlet* u){
    vector* r;
    r->x=u->x;
    r->y=u->y;
    vector* g= weight(r);
    u->ax=(g->x)/(u->m);
    u->ay=(g->y)/(u->m);
    return(u);
}