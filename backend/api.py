from flask import Flask, request, jsonify, json
import requests

app = Flask(__name__)
valid_currencies = {'CAD', 'HKD', 'ISK', 'PHP', 'DKK', 'HUF', 'CZK', 'GBP', 'RON', 'SEK', 'IDR', 'INR', 'BRL', 'RUB', 'HRK', 'JPY', 'THB', 'CHF', 'EUR', 'MYR', 'BGN', 'TRY', 'CNY', 'NOK', 'NZD', 'ZAR', 'USD', 'MXN', 'SGD', 'AUD', 'ILS', 'KRW', 'PLN'}

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/api/convert', methods=['POST'])
def convert():
    body = json.loads(request.data)

    try:
        base_currency = str.upper(body['currency'])
        amount = float(body['amount'])
        desired_currency = str.upper(body['convertTo'])
    
    except KeyError:
        return 'Malformed request body. Excpected currency, amount, and convertTo fields.', 400

    # Check if base currency and desired currency is valid
    if base_currency not in valid_currencies or desired_currency not in valid_currencies:
        return 'Invalid base/target currency', 400

    response = requests.get('https://api.exchangeratesapi.io/latest?base=' + base_currency)
    conversions = response.json()['rates']
    conversion_rate = float(conversions[desired_currency])
    result = dict()
    result['currency'] = desired_currency
    result['amount'] = amount * conversion_rate

    return jsonify(result)
    
if __name__ == '__main__':
    app.run()