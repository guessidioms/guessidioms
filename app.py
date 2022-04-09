# -*- coding: utf-8 -*-

from __future__ import print_function
from __future__ import division

import os
from flask import Flask, render_template
# import random
# import base64

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'secret string')
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

# with open("txt/idioms_reviewed.txt", "rb") as fp:
#     idioms = fp.readlines()
# idioms = [i.strip() for i in idioms]
# idioms_length = len(idioms)

@app.route('/')
def index():
    # random_index = random.randint(0, idioms_length - 1)
    # idiom = idioms[random_index].decode("utf-8")
    return render_template('index.html')

@app.route('/<code>')
def guess(code):
    return render_template('index.html')

# 404 error handler
@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404


# 500 error handler
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('errors/500.html'), 500
