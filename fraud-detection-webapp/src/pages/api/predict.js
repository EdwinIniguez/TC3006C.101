import joblib from 'joblib';
import { NextApiRequest, NextApiResponse } from 'next'; 

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