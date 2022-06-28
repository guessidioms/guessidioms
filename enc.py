import sys

for s in sys.stdin:
    print(s.strip().encode("utf-8").hex())
