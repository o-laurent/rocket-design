#include <stdlib.h>
#include <stdio.h>
#include <math.h>
#include <pthread.h>
#include "forces.h"


#ifndef M_PI
 #define M_PI 3.141592653589793238462643383279
#endif 


//Computes the norm2 of a vector
long double norm (long double x, long double y) {
    long double norm_value = sqrtl(x*x+y*y);
    return norm_value;
}


//Computes the angle of the rocket 
long double command(long double t, commandList* cList) {
    commandList* tmpList = cList;
    long double c = tmpList->c;
    while (tmpList->next != NULL && tmpList->t < t) {
        tmpList = tmpList->next;
        c = tmpList->c;
    }
    return c;
}


//Computes the gravitationnal field anywhere in Earth's influence sphere (Disc in 2D)
vector* weight (vector* r) {
    long double norm_value = norm(r->x, r->y);
    long double mu = (long double)398600.0*1000*1000*1000;
    return linVector(-mu/(norm_value*norm_value*norm_value), r);
}


//Computes the Output multiplied by the ISP
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
    vector* T = malloc(sizeof(vector)+1);
    long double g0 = 9.81; //g0 = 9.81
    T->x = g0*d_isp(t, rocketD)*cos(c);
    T->y = g0*d_isp(t, rocketD)*sin(c);
    return T;
}


//Computes the mass (in kg) at a certain time
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
    force->x = X->dx;
    force->y = X->dy;
    vector* T = thrust(c, t, rocketD);
    vector* W = weight(r);
    vector* acceleration = linVector2(1, W, 1/mass(t, rocketD), T);
    free(r);
    free(T);
    free(W);
    force->dx = acceleration->x;
    force->dy = acceleration->y;
    free(acceleration);
    return force;
}


//J_GTO helper function
long double function_k (bivector* X) {
    long double mu = (long double)398600.0*1000*1000*1000;
    long double norm_v = norm(X->dx, X->dy);
    long double k = norm_v*norm_v/2-mu/norm(X->x, X->y);
    return k;
}


//J_GTO helper function
long double function_p (bivector* X) {
    long double mu = (long double)398600.0*1000*1000*1000;
    long double pp = (X->x*X->dy - X->y*X->dx);
    long double p = pp*pp/mu;
    return p;
}


//Computes the excentricity axis from a position and speed
long double excentricity (bivector* X) {
    long double mu = (long double)398600.0*1000*1000*1000;
    long double o = 1 + (2*function_p(X)*function_k(X))/mu;
    long double e = sqrtl(o);
    return e;
}


//Computes the semi major axis from a position and speed
long double semi_major_axis (bivector* X) {
    long double mu = (long double)398600.0*1000*1000*1000;
    long double norm_v = norm(X->dx, X->dy); 
    long double a = 2/norm(X->x, X->y) - norm_v*norm_v/mu;
    return 1/a;
}


//computes least squares between (a_o, e_o) and (a_GTO, e_GTO)
long double J_GTO (bivector* X) {
    long double agto = (long double)24535135.0;
    long double egto = (long double)0.7185206032;
    long double semi_major = semi_major_axis(X)-agto;
    long double excen = excentricity(X)-egto;
    long double j = semi_major*semi_major/agto/agto + excen*excen/egto/egto; 
    return j;
}


//Runge_Kutta function
stockBivectors* runge_kutta4 (int step_nb, long double h, int t_0, bivector* init_state, rocket_data* rocketD) { 
    //printf("Payload mass %Lf\n", rocketD->pM);
    stockBivectors* stock = malloc(sizeof(stockBivectors)); //Memorizes the state vector at each step
    stock->state = NULL;
    stock->previous = NULL;
    if (step_nb >=1 && h>0) {
        bivector* state = malloc(sizeof(bivector)+1); //Defines the rocket position and speed
        int step = 0;
        long double t = t_0; //time of the simulation

        //Initializing
        state->x = init_state->x;
        state->y = init_state->y;
        state->dx = init_state->dx;
        state->dy = init_state->dy;
        stock->state = init_state;

        bivector* k1;
        bivector* k2;
        bivector* k3;
        bivector* k4;

        for (step=0; step<step_nb; step++) {
            //Computing the four terms of Runge-Kutta
            k1 = forces(t, state, rocketD);
            bivector* linvector = linBivector2(1, state, h/2, k1);
            k2 = forces(t+h/2, linvector, rocketD);
            free(linvector);
            linvector =  linBivector2(1, state, h/2, k2);
            k3 = forces(t+h/2, linvector, rocketD);
            free(linvector);
            linvector = linBivector2(1, state, h, k3);   
            k4 = forces(t+h, linvector, rocketD);
            free(linvector);
            //Computing the result
            bivector* nstate = linBivector5(1, state, h/6, k1, h/3, k2, h/3, k3, h/6, k4);

            //Crash
            /*if (norm(nstate->x, state->y)<((long double)6371000.0)) {
                return stock;
            }*/

            //Memorizing
            stock = consSTOCK(nstate, stock);
            state->x = stock->state->x;
            state->y = stock->state->y;
            state->dx = stock->state->dx;
            state->dy = stock->state->dy;
            t += h;

            //Liberating the memory
            free(k1);
            free(k2);
            free(k3);
            free(k4);
        }
        return stock;
    }
    else {
        return stock;
    }
}


//Frees a stockBivectors structure
void free_sB (stockBivectors* stock) {
    while (stock->previous != NULL) {
        stockBivectors* tmpstock = stock->previous;
        free(stock->state);
        free(stock);
        stock = tmpstock;
    }
}


//Computes trajectory, frees the stock and returns J_GTO
long double runge_kutta_J_GTO (int step_nb, long double h, int t_0, bivector* init_state, rocket_data* rocketD) {
    stockBivectors* stock = runge_kutta4(step_nb, h, t_0, init_state, rocketD);
    long double j = J_GTO(stock->state);
    free_sB(stock);
    return j;
}


//Fonction à vérifier permet de faire varier de h une commande 
commandList* var_cList (commandList* cList, unsigned int n, unsigned int dimension, long double h) {
    commandList* tmpList = malloc(sizeof(commandList));
    //printf("tmp2=%p\n", tmpList);
    commandList* tmpList_top = tmpList;
    commandList* tmpListC = cList;
    int j2=0;
    for (int j=0; j<n; j++) {
        //printf("j=%d\n", j);
        tmpList->c = tmpListC->c;
        tmpList->t = tmpListC->t;
        commandList* tmpList2 = malloc(sizeof(commandList));
        //printf("tmp2=%p\n", tmpList2);
        tmpList->next = tmpList2;
        tmpList = tmpList2;
        //printf("tmpC=%p\n", tmpListC->next);
        tmpListC = tmpListC->next;
        j2++;
    }
    tmpList->c = tmpListC->c + h;
    tmpList->t = tmpListC->t;
    for (int j=j2+1; j<dimension; j++) {
        //printf("j=%d\n", j);
        commandList* tmpList2 = malloc(sizeof(commandList));
        //printf("tmp2=%p\n", tmpList2);
        tmpList->next = tmpList2;
        tmpList = tmpList2;
        //printf("tmpC=%p\n", tmpListC->next);
        tmpListC = tmpListC->next;
        tmpList->c = tmpListC->c;
        tmpList->t = tmpListC->t;
    }
    tmpList->next = NULL;
    //printf("tmp2=%p\n", tmpList);
    return tmpList_top;
}



commandList* hgradient_computation (unsigned int dimension, long double* resh, long double j) {
    commandList* hgrad = malloc(sizeof(commandList));
    //printf("hgrad : %p\n", hgrad);
    commandList* hgrad1 = hgrad;
    for (int i=0; i<dimension-1; i++) {
        hgrad->c = resh[i] - j;
        commandList* hgrad_tmp = malloc(sizeof(commandList));
        hgrad->next = hgrad_tmp;
        hgrad = hgrad_tmp;
        //printf("hgrad : %p\n", hgrad);
    }
    hgrad->c = resh[dimension-1] - j;
    hgrad->next = NULL;
    return hgrad1;
} 


//Modifies the list to make c into ]-pi;pi]
void cList_modPi (unsigned int dimension, commandList* X) {
    commandList* XCrawler = X;
    //printf("Xcrawler %p\n", XCrawler);
    for (int i=0; i<dimension; i++) {
        XCrawler->c = fmodl(XCrawler->c, M_PI);
        XCrawler = XCrawler->next;
        //printf("Xcrawler %p\n", XCrawler);
    }
}


commandList* gradient_descent (commandList* cList0, unsigned int dimension, unsigned int gd_step_nb, 
                                                    long double threshold, int rk_step_nb, long double step_length, int t_0, 
                                                                        bivector* init_state, rocket_data* rocketD) {
    //Initializations
    //printf("inside");
    commandList* X = cList0; 
    ////printf("X %p\n", X);
    rocketD->cList = X;
    commandList* ccList;
    commandList* hgradient;
    long double h = 1.0/10;
    long double pre_j = 1;
    long double j = runge_kutta_J_GTO(rk_step_nb, step_length, t_0, init_state, rocketD);
    /*printf("j = %Lf\n", j);
    printf("X %p\n", X);*/
    int i = 0;
    long double* resh = malloc(dimension*sizeof(long double));

    if (j < 1) {
        //printf("h - thres %Lf, i %d, gd_step_nb %d", h - threshold, i, gd_step_nb);
        while (h>threshold && i<gd_step_nb) {
            //printf("in while");
            while (j<=pre_j && h>threshold && i<gd_step_nb) {
                //printf("i = %d\n",i);
                pre_j = j;
                for (unsigned int k = 0; k<dimension; k++) {
                    //printf("k=%d\n", k);
                    ccList = var_cList(X, k, dimension, h);
                    //cList_modPi(dimension, ccList);
                    rocketD->cList = ccList;
                    resh[k] = runge_kutta_J_GTO(rk_step_nb, step_length, t_0, init_state, rocketD);
                    //printf("resh[%d]=%Lf\n", k, resh[k]);
                }

                hgradient = hgradient_computation(dimension, resh, j);
                X = lin_cList(1, X, -1, hgradient, dimension);
                rocketD->cList = X;
                
                //printf("X2 %p\n", X);
                //A sup
                //cList_modPi(dimension, X);
                j = runge_kutta_J_GTO(rk_step_nb, step_length, t_0, init_state, rocketD);
                //printf("fonctionnelle = %Lf\n", j);
                i++;
                //printf("grad1\n");
            }
            //printf("grad2\n");
            if (i<=gd_step_nb && j>pre_j && h>threshold) {
                //printf("in if");
                //We've been too far
                j = pre_j;
                pre_j = 1; 
                //cList_modPi(dimension, X);
                //printf("grad\n");
                X = lin_cList(1, X, 1, hgradient, dimension); //Come back to the previous point
                rocketD->cList = X;
                j = runge_kutta_J_GTO(rk_step_nb, step_length, t_0, init_state, rocketD);
                //printf("fonctionnelle = %Lf\n", j);
                h = h/2; //reducing h
                i--;
                if (i==gd_step_nb) {
                    i--;
                }
            }
        }
        //printf("X1 %p\n", X);
        //cList_modPi(dimension, X);
        //printf("X %p\n", X);
        rocketD->cList = X;
        //printf("h %Lf, threshold %Lf, i %d, rk_step_nb %d", h, threshold, i, rk_step_nb);
        j = runge_kutta_J_GTO(rk_step_nb, step_length, t_0, init_state, rocketD);
    }
    else {
        //printf("Erreur; j trop grand pour une amélioration intéressante\n");
        -1;
    }
    //printf("j=%Lf\n", j);
    return X;
}