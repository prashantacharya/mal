ROOT := $(shell pwd)
COMMAND ?= bang.js 

start:
	@docker run -it -v $(ROOT)/src:/app/src prashantacharya/lisp node src/$(COMMAND)

build:
	@docker build . -t prashantacharya/lisp
