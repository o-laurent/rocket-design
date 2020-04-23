#include <stdio.h>
#include <math.h>
#include "structures.h"
#include "forces.h"

long double norm (long double x, long double y) {
    long double norm_value = sqrtl(x*x+y*y);
    return norm_value;
}

vector weight (vector r) {
    printf("r.x = %Lf, r.y= %Lf", r.x, r.y);
    long double norm_value = norm(r.x,r.y);
    printf("norm_value = %Lf", norm_value);
    long double mu = (long double)398600*1000*1000*1000;
    return linVector(-mu/(norm_value*norm_value*norm_value), &r);
}
