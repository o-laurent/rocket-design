#include <stdio.h>
#include <stdlib.h>
#include "verlet.h"
#include "structures.h"
#include "forces.h"
//You can check the theory behind Verlet on wikipedia using this site : https://en.wikipedia.org/wiki/Verlet_integration
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
//Get the position of the rocket using Verlet method in a stockBivector 
//this method will need two previous positions to calculate the new one 
stockBivectors* verlet (bivector* init_state1, bivector* init_state2) { 
    stockBivectors* stock = malloc(sizeof(stockBivectors)); //allocating the space
    stock->state = NULL;
    stock->previous = NULL;
    bivector* state = malloc(sizeof(bivector)+1);
    
    state->x = init_state1->x;
    state->y = init_state1->y;
    state->dx = init_state1->dx;
    state->dy = init_state1->dy;
    stock->state = state;

    pointVerlet* position_t = malloc(sizeof(pointVerlet)+1);
    position_t->x = init_state1->x;
    position_t->y = init_state1->y;
    position_t->old_x = init_state2->x;
    position_t->old_y = init_state2->y;
    position_t = new_acceleration(position_t); //calculation the acceleration
    position_t = new_position(position_t); //calculating the first position of my rocket using Verlet method

    state->x = position_t->x;
    state->y = position_t->y;
    stock = consSTOCK(state, stock); //adding the first position to the list of bivector
    free(state);
    int i = 0; //indicator that will help us identify when we did one turn 
    while (i != 2) { //will quit on the condition of doing 2*pi angle (one turn)
        
        bivector* state = malloc(sizeof(bivector)+1);
        state->x = stock->state->x;
        state->y = stock->state->y;
        state->dx = stock->state->dx;
        state->dy = stock->state->dy;
        position_t = new_acceleration(position_t); //calculating the new acceleration
        position_t = new_position(position_t); //calculating the new position 

        state->x = position_t->x; //associating the bivector with the x position
        state->y = position_t->y; //associating the bivector with the y position 
        stock = consSTOCK(state, stock); //function that add the new bivector to the list 

        if (init_state1->x == state->x) {
            i=i+1 //will add one  to i for each angle of pi done
        }
        
        free(state); //freeing the memory at each iteration
    }
    free(position_t); //freeing the memory 
    return(stock); 
}