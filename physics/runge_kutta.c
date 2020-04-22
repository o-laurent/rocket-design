#include <stdio.h>
#include <stdlib.h>
#include "runge_kutta.h"

bivector runge_kutta4 (int step_nb, double h, int t_0, bivector init_state) { 
    if (step_nb >=1 && h>0) {
        int step = 0;
        double sh = h*h;
        double t = t_0;
        bivector state = init_state;
        double x, dx, y, dy;
        bivector k1, k2, k3, k4;
        for (step=0; step<step_nb; step++) {
            k1 = forces(t, state);
            k2 = forces(t+h/2, linVector(1, &state, h/2, &k1));
            k3 = forces(t+h/2, linVector(1, &state, h/2, &k2));
            k4 = forces(t+h, linVector(1, &state, h, &k3));
            state = linVector5(1, &state, h/6, &k1, h/3, &k2, h/3, &k3, h/6, &k4);
            t += h;
        }
    }
}