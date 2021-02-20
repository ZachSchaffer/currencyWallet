from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"

@app.route('/api/convert', methods=['POST'])
def convert():
    print(request.json)
    return jsonify('Test')

if __name__ == '__main__':
    app.run()
