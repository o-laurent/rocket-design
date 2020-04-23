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

//1D linear transformation
vector* linVector(long double l1, vector* vA) {
    vector* v = malloc(sizeof(vector)+1);
    v->x = vA->x*l1;
    v->y = vA->y*l1;
    return v;
}

//2D linear transformation
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