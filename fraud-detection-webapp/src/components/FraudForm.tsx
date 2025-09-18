import React, { useState } from 'react';

const FraudForm = () => {
    const [formData, setFormData] = useState({
        income: '',
        name_email_similarity: '',
        prev_address_months_count: '',
        current_address_months_count: '',
        customer_age: '',
        days_since_request: '',
        intended_balcon_amount: '',
        zip_count_4w: '',
        bank_branch_count_8w: '',
        date_of_birth_distinct_emails_4w: '',
        proposed_credit_limit: '',
        session_length_in_minutes: ''
    });

    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPrediction(null);

        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Fraud Detection Form</h1>
            <form onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key}>
                        <label>
                            {key.replace(/_/g, ' ')}:
                            <input
                                type="text"
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                required
                            />
                        </label>
                    </div>
                ))}
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
            {prediction !== null && (
                <div>
                    <h2>Prediction: {prediction ? 'Fraud' : 'No Fraud'}</h2>
                </div>
            )}
        </div>
    );
};

export default FraudForm;