#include <stdlib.h>

//2D vector corresponding to 2D-data
typedef struct vector vector;
struct vector {
    long double x;
    long double y;
};

//4D vector corresponding to 2D-data and its derivatives
typedef struct bivector bivector;
struct bivector {
    long double x;
    long double dx;
    long double y;
    long double dy;
};

//Struct containing the heading
typedef struct commandList commandList;
struct commandList {
    long double t; //max time of the current angle
    long double c; //current angle
    commandList* next; 
};

//Structure containing all useful information concerning the rocket 
typedef struct rocket_data rocket_data;
struct rocket_data {
    int stageNumber; //Number of stages 1 or 2
    int boosters; //=1 if with boosters else =0 
    long double fO; //Output of the first stage
    long double fISP; //Specific Impulse of the first stage
    long double sO; //Output of the second stage
    long double sISP; //Specific Impulse of the second stage
    long double bO; //Output of the boosters
    long double bISP; //Specific Impulse of the boosters
    long double T1; // Time | 1 Stage stops
    long double T2; // Time | 2 Stage stops
    long double TB; // Time | Boosters stop
    long double fM; //first stage's mass
    long double sM; //second stage's mass
    long double bM; //boosters' mass
    long double pM; //Payload mass
    commandList* cList; //List of the commands
};

//1D linear transformation of vectors
vector* linVector(long double l1, vector* vA) {
    vector* v = malloc(sizeof(vector)+1);
    v->x = vA->x*l1;
    v->y = vA->y*l1;
    return v;
}

//2D linear transformation of vectors
vector* linVector2(long double l1, vector* vA,
                    long double l2, vector* vB) {
    vector* v = malloc(sizeof(vector)+1);
    v->x = vA->x*l1 + vB->x*l2;
    v->y = vA->y*l1 + vB->y*l2;
    return v;
}


//2D linear transformation for bivectors
bivector* linBivector2(long double l1, bivector* vA, 
                    long double l2, bivector* vB) {

    bivector* r = malloc(sizeof(bivector)+1);
    r->x = l1*vA->x + l2*vB->x;
    r->y = l1*vA->y + l2*vB->y;
    r->dx = l1*vA->dx + l2*vB->dx;
    r->dy = l1*vA->dy + l2*vB->dy;
    return r; 
}


//5D linear transformation for bivectors (RK4)
bivector* linBivector5(long double l1, bivector* vA, 
                    long double l2, bivector* vB, 
                    long double l3, bivector* vC, 
                    long double l4, bivector* vD,
                    long double l5, bivector* vE) {

    bivector* r = malloc(sizeof(bivector)+1);
    r->x = l1*vA->x + l2*vB->x + l3*vC->x + l4*vD->x + l5*vE->x;
    r->y = l1*vA->y + l2*vB->y + l3*vC->y + l4*vD->y + l5*vE->y;
    r->dx = l1*vA->dx + l2*vB->dx + l3*vC->dx + l4*vD->dx + l5*vE->dx;
    r->dy = l1*vA->dy + l2*vB->dy + l3*vC->dy + l4*vD->dy + l5*vE->dy;
    return r; 
}