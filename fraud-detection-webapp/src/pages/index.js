import { useState } from 'react';
import axios from 'axios';

const featureOrder = [
 'income',
 'name_email_similarity',
 'prev_address_months_count',
 'current_address_months_count',
 'customer_age',
 'days_since_request',
 'intended_balcon_amount',
 'payment_type',
 'zip_count_4w',
 'velocity_4w',
 'bank_branch_count_8w',
 'date_of_birth_distinct_emails_4w',
 'employment_status',
 'credit_risk_score',
 'email_is_free',
 'housing_status',
 'phone_home_valid',
 'phone_mobile_valid',
 'bank_months_count',
 'has_other_cards',
 'proposed_credit_limit',
 'foreign_request',
 'source',
 'session_length_in_minutes',
 'device_os',
 'keep_alive_session',
 'device_distinct_emails_8w',
 'device_fraud_count',
 'month',
 'prev_address_unknown',
 'bank_months_unknown'
];

const initialState = Object.fromEntries(featureOrder.map(f => [f, ""]));

const Home = () => {
  const [inputData, setInputData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [csvInput, setCsvInput] = useState('');

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // Llena los campos automáticamente desde el textarea
  const handleCsvPaste = () => {
    const values = csvInput.split(',').map(v => v.trim());
    if (values.length !== featureOrder.length) {
      alert(`Se esperaban ${featureOrder.length} valores, pero recibiste ${values.length}`);
      return;
    }
    const newData = {};
    featureOrder.forEach((key, idx) => {
      newData[key] = values[idx];
    });
    setInputData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convierte a número donde corresponda si tu backend lo requiere
      const features = featureOrder.map(f => {
        // Si es numérico, convierte, si no, deja string
        return isNaN(Number(inputData[f])) || inputData[f] === "" ? inputData[f] : Number(inputData[f]);
      });
      const response = await axios.post('http://localhost:5000/predict', { features });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Fraud Detection</h1>
      <div>
        <textarea
          rows={3}
          style={{ width: "100%" }}
          placeholder="Pega aquí la fila del dataset (sin el fraud_bool, separado por comas)"
          value={csvInput}
          onChange={e => setCsvInput(e.target.value)}
        />
        <button type="button" onClick={handleCsvPaste}>Llenar campos automáticamente</button>
      </div>
      <form onSubmit={handleSubmit}>
        {featureOrder.map((f, idx) => (
          <div key={f}>
            <input
              type="text"
              name={f}
              value={inputData[f]}
              onChange={handleChange}
              placeholder={f}
              required
            />
          </div>
        ))}
        <button type="submit">Check Fraud</button>
      </form>
      {result && <div>Prediction: {result.prediction}</div>}
    </div>
  );
};

export default Home;