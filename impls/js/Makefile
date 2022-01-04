ROOT := $(shell pwd)
COMMAND ?= step4_if_fn_do.js 

start:
	@docker run -it -v $(ROOT)/src:/app/src prashantacharya/lisp node src/$(COMMAND)

build:
	@docker build . -t prashantacharya/lisp
