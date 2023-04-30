import sys
from flask_frozen import Freezer
sys.path.append('.')

if __name__ == '__main__':
    from app import app
    freezer = Freezer(app)
    freezer.freeze()
