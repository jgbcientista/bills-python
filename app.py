from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return 'Home'

@app.route('/categoria/')
def categoria():
    return 'Categoria'

if __name__ == '__main__':
    app.run(debug=True)