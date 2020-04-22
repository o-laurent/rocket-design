#include <stdio.h>
#include <math.h>
#include "forces.h"

long double norm (long double x, long double y) {
    long double norm_value = sqrtl(x*x+y*y);
    return norm_value;
}

long double weight (long double x, long double y) {
    long double norm_value = norm(x,y);
    long double mu = (long double)398600*1000*1000*1000;
    return(-mu/(norm_value*norm_value));
}