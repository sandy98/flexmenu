#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys, http.server

def main():
    HOST, PORT = '', 8086
    print(f"Serving web content at ({HOST}, {PORT})")
    server = http.server.ThreadingHTTPServer((HOST, PORT), http.server.SimpleHTTPRequestHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nKeyboard interrupt.")
    except Exception as exc:
        print(f"\nUnknown exception: {exc}")
    finally:
        server.server_close()
        print("\nBye")


if __name__ == '__main__':
    main()



