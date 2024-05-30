def READ(code):
    return code

def EVAL(ast):
    return ast

def PRINT(res):
    return res

def rep(code: str):
    return PRINT(EVAL(READ(code)))


while True:
    code = input("user> ")
    result = rep(code)
    print(result)
