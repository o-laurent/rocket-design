#include <stdio.h>
#include <stdlib.h>
#include "verlet.h"
#include "structures.h"

//Computes the gravitationnal field anywhere in Earth's influence sphere (Disc in 2D)
vector* weight (vector* r) {
    long double norm_value = norm(r->x, r->y);
    long double mu = (long double)398600.0*1000*1000*1000;
    return linVector(-mu/(norm_value*norm_value*norm_value), r);
}
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
    u->ax=(g->x);
    u->ay=(g->y);
    return(u);
}

stockBivectors* verlet (int step_nb, int t_0, bivector* init_state, rocket_data* rocketD) { 
    stockBivectors* stock = malloc(sizeof(stockBivectors));
    stock->state = NULL;
    stock->previous = NULL;
    bivector* state = malloc(sizeof(bivector)+1);
    if (step_nb >=1) {
        int step = 0;
        long double t = t_0;
        state->x = init_state->x;
        state->y = init_state->y;
        state->dx = init_state->dx;
        state->dy = init_state->dy;
        stock->state = state;
        for (step=0; step<step_nb; step++) {
            
            state = linBivector5(1, state, h/6, k1, h/3, k2, h/3, k3, h/6, k4);
            stock = consSTOCK(state, stock);
            bivector* state = malloc(sizeof(bivector)+1);
            state->x = stock->state->x;
            state->y = stock->state->y;
            state->dx = stock->state->dx;
            state->dy = stock->state->dy;
            t += h;
        }
        free(state);
        return stock;
    }
    else {
        free(state);
        state->x = 0;
        state->y = 0;
        state->dx = 0;
        state->dy = 0;
        return stock;
    }
}