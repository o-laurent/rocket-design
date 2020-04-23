all: physics

physics: physics.o
	gcc -shared -o physics.so physics.o

physics.o: forces.c
	gcc -Wall -c forces.c -o physics.o 

clean_o:
	rm -rf *.o

clean:
	rm -rf *.o
	rm physics.so