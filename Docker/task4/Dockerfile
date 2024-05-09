FROM gcc
RUN apt-get update
COPY program.c program.c
RUN gcc program.c
CMD ["./a.out"]