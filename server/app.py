#!/usr/bin/python

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from resources.database_setup import Base, Categoria
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

engine = create_engine('postgresql://postgres:postgres@localhost:5432/bills')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()

@app.route("/")
def index():
    return "Hello!"


@app.route("/categorias", methods=["GET", "POST"])
def categoria():
    categorias = session.query(Categoria).order_by(Categoria.nome)
    return jsonify(categorias=[c.serialize for c in categorias]) # jsonify({'store': stores})


@app.route("/categorias/<id>")
def categoria_det(id = None):
    categoria = session.query(Categoria).get(id)
    return jsonify(categoria.serialize)


if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)
