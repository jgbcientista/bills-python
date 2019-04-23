#!/usr/bin/python

from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, json
from flask_restful import Resource, Api, reqparse
from flask_jwt import JWT, jwt_required, current_identity
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from resources.database_setup import Base, Categoria, Lancamento
from flask_cors import CORS, cross_origin

from resources.security import authenticate, identity

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'jose'
api = Api(app)
CORS(app)
jwt = JWT(app, authenticate, identity)

engine = create_engine('postgresql://postgres:postgres@localhost:5432/bills')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route("/")
def index():
    return "Hello!"


class CategoriaList(Resource):
    def get(self):
      categorias = session.query(Categoria).order_by(Categoria.nome)
      return jsonify(categorias=[c.serialize for c in categorias])  # jsonify({'store': stores})


class CategoriaResource(Resource):
    def get(self, id):
      categoria = session.query(Categoria).get(id)
      return jsonify(categoria.serialize)

    def post(self, categoria):
        session.add(Categoria(request.json['id'], request.json['nome']))
        session.commit()
        return json.dumps(request.json), 201

    def delete(self, id):
        categoria = session.query(Categoria).get(id)
        session.delete(categoria)
        session.commit()
        return jsonify(categoria.serialize)

    def put(self, id):
        categoria = session.query(Categoria).get(id)
        categoria.nome = request.json.get('nome', categoria.nome)
        session.commit()
        return jsonify(categoria.serialize)
    #     return {'item': None}, 404


@app.route("/categorias/<id>")
def categoria_get(id = None):
    categoria = session.query(Categoria).get(id)
    return jsonify(categoria.serialize)


class LancamentoList(Resource):
    def get(self):
      lancamentos = session.query(Lancamento).order_by(Lancamento.estabelecimento)
      return jsonify(lancamentos=[l.serialize for l in lancamentos])  # jsonify({'store': stores})

class LancamentoResource(Resource):
    def get(self, id):
        lancamento = session.query(Lancamento).get(id)
        return jsonify(lancamento.serialize)

    def post(self, lancamento):
        session.add(Lancamento(request.json['id'],
                               request.json['estabelecimento'],
                               request.json['data'],
                               request.json['valor']))
        session.commit()
        return json.dumps(request.json)

    def put(id):
        lancamento = session.query(Lancamento).get(id)
        lancamento.nome = request.json.get('nome', lancamento.nome)
        session.commit()
        return jsonify(lancamento.serialize)

    def delete(id):
        lancamento = session.query(Lancamento).get(id)
        session.delete(lancamento)
        session.commit()
        return jsonify(lancamento.serialize)


api.add_resource(CategoriaList, '/categorias')
api.add_resource(CategoriaResource, '/categorias/<int:id>')
api.add_resource(LancamentoList, '/lancamentos')
api.add_resource(LancamentoResource, '/lancamentos/<int:id>')


if __name__ == '__main__':
    app.debug = True
    app.run(host = '0.0.0.0', port = 5000)
