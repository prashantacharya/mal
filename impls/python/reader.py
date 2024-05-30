import readline as pyreadline

def readline():
    pyreadline.parse_and_bind('tab: complete')
    pyreadline.set_history_length(100)

    while True:
        try:
            line = input('user> ')
            pyreadline.add_history(line)
        except EOFError:
            print('\nExiting...')
            break
        except KeyboardInterrupt:
            print('\nInterrupted. Exiting...')
            break

        return line
