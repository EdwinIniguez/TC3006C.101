from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

model = joblib.load('model/model.pkl')
scaler = joblib.load('model/scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    # Suponiendo que recibes un array con los features en el mismo orden que el entrenamiento
    X = np.array([data['features']])
    X_scaled = scaler.transform(X)
    pred = model.predict(X_scaled)
    proba = model.predict_proba(X_scaled)[0, 1] if hasattr(model, "predict_proba") else None
    return jsonify({
        'prediction': int(pred[0]),
        'probability': float(proba) if proba is not None else None
    })

if __name__ == '__main__':
    app.run(debug=True)