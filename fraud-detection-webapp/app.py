from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('model/logistic_regression_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    pred = model.predict(features)[0]
    prob = model.predict_proba(features)[0, 1]
    return jsonify({'prediction': int(pred), 'probability': float(prob)})

if __name__ == '__main__':
    app.run(debug=True)