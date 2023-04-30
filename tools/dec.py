import sys

for s in sys.stdin:
    print(bytes.fromhex(s).decode('utf-8'))