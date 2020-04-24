#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include "forces.h"

//Computes the norm2 of a vector
long double norm (long double x, long double y) {
    long double norm_value = sqrtl(x*x+y*y);
    return norm_value;
}

//Computes the angle of the rocket 
long double command(long double t, rocket_data* rocketD) {
    commandList* tempList = rocketD->cList;
    long double c = 0;
    while (tempList->next != NULL && tempList->t < t) {
        tempList = tempList->next;
        c = tempList->c;
    }
    return c;
}

//Computes the gravitationnal field anywhere in Earth's influence sphere (disc)
vector* weight (vector* r) {
    long double norm_value = norm(r->x, r->y);
    long double mu = (long double)398600*1000*1000*1000;
    return linVector(-mu/(norm_value*norm_value*norm_value), r);
}

//Computes the Output times the ISP
long double d_isp (long double t, rocket_data* rocketD) {
    long double d_isp = 0;
    //If the first stage is working, the second is not
    if (t < rocketD->T1) {
        d_isp += rocketD->fISP * rocketD->fO;
    }
    else if (t < rocketD->T2) {
        d_isp += rocketD->sISP * rocketD->sO;
    }
    else { //After the end of the second stage
        d_isp += 0;
    }
    //If the boosters are working
    if (t < rocketD->TB) {
        d_isp += rocketD->bISP * rocketD->bO;
    }
    return d_isp;
}

//Computes the thrust vector
vector* thrust (long double c, long double t, rocket_data* rocketD) {
    //To be modified
    vector* T = malloc(sizeof(vector)+1);
    long double G0 = 6.67430/(100000000000); //G0 = 6.67430*10^(-11)
    T->x = G0*d_isp(t, rocketD)*cos(c);
    T->y = G0*d_isp(t, rocketD)*sin(c);
    return T;
}

//Computes the mass at a certain time
long double mass(long double t, rocket_data* rocketD) {
    printf("t = %Lf", t);
    long double totalM = 0;
    if (t < rocketD->T1 && t < rocketD->TB) {
        totalM = rocketD->pM + rocketD->fM + rocketD->sM + rocketD->bM - t*(rocketD->fO + rocketD->bO);
    } 
    else if (t < rocketD->T1) {
        totalM = rocketD->pM + rocketD->fM + rocketD->sM - t*rocketD->fO;
    }
    else if(t < rocketD->T2) {
        totalM = rocketD->pM + rocketD->sM - (t-rocketD->T1)*rocketD->sO;
    }
    else {
        totalM = rocketD->pM;
    }
    return totalM;
}

//X.x and X.y are the position and X.dx, X.dy the speed of the rocket
bivector* forces (long double t, bivector* X, rocket_data* rocketD) {
    vector* r = malloc(sizeof(vector)+1);
    long double c = command(t, rocketD);
    r->x = X->x;
    r->y = X->y;
    bivector* force = malloc(sizeof(bivector)+1); //is the variation of (X.x, X.y, X.dx, D.dy)
    force->x = X->x;
    force->y = X->y;
    vector* acceleration = malloc(sizeof(vector)+1);
    acceleration = linVector2(1, weight(r), 1/mass(t, rocketD), thrust(c, t, rocketD));
    force->dx = acceleration->x;
    force->dy = acceleration->y;
    return force;
}