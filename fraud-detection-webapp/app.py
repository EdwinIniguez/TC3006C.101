from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

# --- Agrega esta función exactamente igual que cuando entrenaste el modelo ---
def clip_outliers_iqr(df):
    df_copy = df.copy()
    # Solo columnas numéricas
    numeric_cols = df_copy.select_dtypes(include=[np.number]).columns
    for col in numeric_cols:
        Q1 = df_copy[col].quantile(0.25)
        Q3 = df_copy[col].quantile(0.75)
        IQR = Q3 - Q1
        limite_inferior = Q1 - 1.5 * IQR
        limite_superior = Q3 + 1.5 * IQR
        df_copy[col] = df_copy[col].clip(lower=limite_inferior, upper=limite_superior)
    return df_copy

app = Flask(__name__)
CORS(app)

model = joblib.load('C:/Users/edosa/Documents/Uni/7to/Reto/R1/TC3006C.101/fraud-detection-webapp/model/logistic_regression_model.pkl')

import pandas as pd

feature_names = [
    "income",
    "name_email_similarity",
    "prev_address_months_count",
    "prev_address_unknown",
    "current_address_months_count",
    "customer_age",
    "days_since_request",
    "intended_balcon_amount",
    "payment_type",
    "zip_count_4w",
    "velocity_4w",
    "bank_branch_count_8w",
    "date_of_birth_distinct_emails_4w",
    "employment_status",
    "credit_risk_score",
    "email_is_free",
    "housing_status",
    "phone_home_valid",
    "phone_mobile_valid",
    "bank_months_count",
    "bank_months_unknown",
    "has_other_cards",
    "proposed_credit_limit",
    "foreign_request",
    "source",
    "session_length_in_minutes",
    "device_os",
    "keep_alive_session",
    "device_distinct_emails_8w",
    "device_fraud_count",
    "month"
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = data['features']
    # Convierte a DataFrame con nombres de columna
    X = pd.DataFrame([features], columns=feature_names)
    pred = model.predict(X)[0]
    prob = model.predict_proba(X)[0, 1]
    return jsonify({'prediction': int(pred), 'probability': float(prob)})

if __name__ == '__main__':
    app.run(debug=True)