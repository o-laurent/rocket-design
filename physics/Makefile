all: force

force: forces.o
	gcc -shared forces.o -o physics.so 

forces.o: forces.c
	gcc -Wall -c forces.c -o forces.o 

clean_o:
	rm -rf *.o

clean:
	rm -rf *.o
	rm -rf *.so