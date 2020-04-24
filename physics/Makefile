all: physics runge_kutta

runge_kutta: runge_kutta.o 
	gcc -shared runge_kutta.o -o runge_kutta.so 

physics: forces.o
	gcc -shared forces.o -o physics.so 

runge_kutta.o: runge_kutta.c
	gcc -Wall -c runge_kutta.c -o runge_kutta.o

forces.o: forces.c
	gcc -Wall -c forces.c -o forces.o 

clean_o:
	rm -rf *.o

clean:
	rm -rf *.o
	rm physics.so
	runge_kutta.so