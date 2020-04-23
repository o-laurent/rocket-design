#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include "structures.h"
#include "forces.h"

long double norm (long double x, long double y) {
    //Computes the norm2 of a vector
    long double norm_value = sqrtl(x*x+y*y);
    return norm_value;
}

vector* weight (vector* r) {
    //Computes the gravitationnal field anywhere in Earth's influence sphere
    printf("r.x = %Lf, r.y = %Lf", r->x, r->y);
    long double norm_value = norm(r->x, r->y);
    long double mu = (long double)398600*1000*1000*1000;
    return linVector(-mu/(norm_value*norm_value*norm_value), r);
}

vector* thrust (long double c, long double t) {
    //To be modified
    vector* T = malloc(sizeof(vector)+1);
    T->x = 1;
    T->y = 1;
    return T;
}

long double mass(t) {
    return 1;
}

bivector forces (long double t, bivector X) {
    //X.x and X.y are the position and X.dx, X.dy the speed of the rocket
    vector* r = malloc(sizeof(vector)+1);
    long double c = 1;
    r->x = X.x;
    r->y = X.y;
    bivector* force = malloc(sizeof(bivector)+1); //is the variation of (X.x, X.y, X.dx, D.dy)
    force->x = X.x;
    force->y = X.y;
    vector* acceleration = malloc(sizeof(vector)+1);
    acceleration = linVector2(1, weight(r), 1/mass(t), thrust(c, t));
}