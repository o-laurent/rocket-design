typedef struct bivector bivector;
struct bivector {
    double x;
    double dx;
    double y;
    double dy;
};


/*Do r = l1*x+l2*y*/
bivector linVector(double l1, bivector* vA, 
                    double l2, bivector* vB) {

    bivector r;
    r.x = l1*(*vA).x + l2*(*vB).x;
    r.y = l1*(*vA).y + l2*(*vB).y;
    r.dx = l1*(*vA).dx + l2*(*vB).dx;
    r.dy = l1*(*vA).dy + l2*(*vB).dy;
    return r; 
}


/*Do r = l1*x+l2*y*/
bivector linVector5(double l1, bivector* vA, 
                    double l2, bivector* vB, 
                    double l3, bivector* vC, 
                    double l4, bivector* vD,
                    double l5, bivector* vE) {

    bivector r;
    r.x = l1*vA->x + l2*vB->x + l3*vC->x + l4*vD->x + l5*vE->x;
    r.y = l1*vA->y + l2*vB->y + l3*vC->y + l4*vD->y + l5*vE->y;
    r.dx = l1*vA->dx + l2*vB->dx + l3*vC->dx + l4*vD->dx + l5*vE->dx;
    r.dy = l1*vA->dy + l2*vB->dy + l3*vC->dy + l4*vD->dy + l5*vE->dy;
    return r; 
}