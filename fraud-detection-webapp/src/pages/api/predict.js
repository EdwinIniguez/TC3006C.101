import joblib from 'joblib';
import { NextApiRequest, NextApiResponse } from 'next'; 
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


const model = joblib.load('model/logistic_regression_model.pkl');

export default async (req, res) => {
    if (req.method === 'POST') {
        const inputData = req.body;

        // Preprocess inputData as necessary
        const prediction = model.predict([inputData]);

        res.status(200).json({ prediction: prediction[0] });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};