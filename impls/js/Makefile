ROOT := $(shell pwd)
COMMAND ?= step4_if_fn_do.js 

start:
	@docker run -it -v $(ROOT):/app prashantacharya/lisp node $(COMMAND)

build:
	@docker build . -t prashantacharya/lisp
