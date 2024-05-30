
from reader import readline


def READ(code):
    return code

def EVAL(ast):
    return ast

def PRINT(res):
    return res

def rep(code: str):
    return PRINT(EVAL(READ(code)))


while True:
    code = readline()
    if code is None: 
        break;

    result = rep(code)
    print(result)
