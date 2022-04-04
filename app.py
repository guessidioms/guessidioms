# -*- coding: utf-8 -*-
import os
import base64
from flask import Flask, render_template, flash, redirect, url_for, Markup
import base64

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'secret string')
app.jinja_env.trim_blocks = True
app.jinja_env.lstrip_blocks = True

@app.route('/')
def index():
    return render_template('index.html', code="花好月圆")

@app.route('/<code>')
def guess(code):
    return render_template('index.html', code=base64.b16decode(code).decode("utf-8"))

# 404 error handler
@app.errorhandler(404)
def page_not_found(e):
    return render_template('errors/404.html'), 404


# 500 error handler
@app.errorhandler(500)
def internal_server_error(e):
    return render_template('errors/500.html'), 500
