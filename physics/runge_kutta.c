#include <stdio.h>
#include <stdlib.h>
#include "forces.h"
#include "structures.h"


stockBivectors* runge_kutta4 (int step_nb, long double h, int t_0, bivector* init_state, rocket_data* rocketD) { 
    stockBivectors* stock = malloc(sizeof(stockBivectors));
    stock->state = NULL;
    stock->previous = NULL;
    bivector* state = malloc(sizeof(bivector)+1);
    if (step_nb >=1 && h>0) {
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
            k1 = forces(t, state, rocketD);
            k2 = forces(t+h/2, linBivector2(1, state, h/2, k1), rocketD);
            k3 = forces(t+h/2, linBivector2(1, state, h/2, k2), rocketD);
            k4 = forces(t+h, linBivector2(1, state, h, k3), rocketD);
            state = linBivector5(1, state, h/6, k1, h/3, k2, h/3, k3, h/6, k4);
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
        free(state);
        state->x = 0;
        state->y = 0;
        state->dx = 0;
        state->dy = 0;
        return stock;
    }
}