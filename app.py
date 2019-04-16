#!/usr/bin/python

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
app = Flask(__name__)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Categoria

engine = create_engine('postgresql://postgres:postgres@localhost:5432/bills')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route("/")
def index():
    return "Hello!"


@app.route("/categorias/")
# @app.route("/categorias/<id>")
def categoria(id = None):
    cats  = session.query(Categoria).order_by(Categoria.nome)
    output = ''
    for c in cats:
        print (c.nome)
        output += c.nome
        output += '<br>'

    return jsonify(categorias=[c.serialize for c in cats])

if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)