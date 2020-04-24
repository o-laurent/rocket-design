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
long double command(long double t, commandList* cList) {
    commandList* tmpList = malloc(sizeof(commandList)+1);
    tmpList = cList;
    long double c = 0;
    while (tmpList->next != NULL && tmpList->t < t) {
        tmpList = tmpList->next;
        c = tmpList->c;
    }
    return c;
}

//Computes the gravitationnal field anywhere in Earth's influence sphere (disc)
vector* weight (vector* r) {
    long double norm_value = norm(r->x, r->y);
    long double mu = (long double)398600.0*1000*1000*1000;
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
    long double c = command(t, rocketD->cList);
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

//Runge_Kutta function
stockBivectors* runge_kutta4 (int step_nb, long double h, int t_0, bivector* init_state, rocket_data* rocketD) { 
    stockBivectors* stock = malloc(sizeof(stockBivectors));
    printf("step : %p\n", stock);
    stock->state = NULL;
    stock->previous = NULL;
    if (step_nb >=1 && h>0) {
        bivector* state = malloc(sizeof(bivector)+1);
        int step = 0;
        long double t = t_0;
        state->x = init_state->x;
        state->y = init_state->y;
        state->dx = init_state->dx;
        state->dy = init_state->dy;
        stock->state = state;
        bivector* k1 = malloc(sizeof(bivector)+1);
        bivector* k2 = malloc(sizeof(bivector)+1);
        bivector* k3 = malloc(sizeof(bivector)+1);
        bivector* k4 = malloc(sizeof(bivector)+1);
        for (step=0; step<step_nb; step++) {
            printf("step : %d\n", step);
            k1 = forces(t, state, rocketD);
            printf("step : %d\n", step);
            k2 = forces(t+h/2, linBivector2(1, state, h/2, k1), rocketD);
            k3 = forces(t+h/2, linBivector2(1, state, h/2, k2), rocketD);
            k4 = forces(t+h, linBivector2(1, state, h, k3), rocketD);
            state = linBivector5(1, state, h/6, k1, h/3, k2, h/3, k3, h/6, k4);
            printf("step : %d\n", step);
            stock = consSTOCK(state, stock);
            bivector* state = malloc(sizeof(bivector)+1);
            state->x = stock->state->x;
            state->y = stock->state->y;
            state->dx = stock->state->dx;
            state->dy = stock->state->dy;
            t += h;
        }
        free(k1);
        free(k2);
        free(k3);
        free(k4);
        free(state);
        return stock;
    }
    else {
        return stock;
    }
}