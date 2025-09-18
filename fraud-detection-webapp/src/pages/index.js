import { useState } from 'react';
import axios from 'axios';

const featureOrder = [
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
];

const initialState = Object.fromEntries(featureOrder.map(f => [f, ""]));

export default function Home() {
  const [inputData, setInputData] = useState(initialState);
  const [result, setResult] = useState(null);
  const [csvInput, setCsvInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

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
    setLoading(true);
    setResult(null);
    try {
      const features = featureOrder.map(f => {
        // Si es numérico, convierte, si no, deja string
        return isNaN(Number(inputData[f])) || inputData[f] === "" ? inputData[f] : Number(inputData[f]);
      });
      const response = await axios.post('http://localhost:5000/predict', { features });
      setResult(response.data);
    } catch (error) {
      setResult({ error: "Error al predecir. Revisa los datos y el servidor." });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Fraud Detection Demo</h1>
      <div className="card">
        <label className="label">
          <span>Pega aquí la fila del dataset (sin <b>fraud_bool</b>, separado por comas):</span>
          <textarea
            rows={3}
            className="textarea"
            placeholder="50000,0.85,12,1,24,35,10,1500,credit_card,3,0,0,5,employed,650,1,owner,1,1,1,24,0,5000,0,web,45,android,1,2,0,7"
            value={csvInput}
            onChange={e => setCsvInput(e.target.value)}
          />
        </label>
        <button type="button" className="button" onClick={handleCsvPaste}>Llenar campos automáticamente</button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="grid">
          {featureOrder.map((f, idx) => (
            <label key={f} className="label">
              <span>{f.replace(/_/g, ' ')}</span>
              <input
                type="text"
                name={f}
                value={inputData[f]}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
          ))}
        </div>
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Consultando..." : "Check Fraud"}
        </button>
      </form>
      {result && (
        <div className="result">
          {result.error ? (
            <span className="error">{result.error}</span>
          ) : (
            <>
              <h2>Resultado</h2>
              <div>
                <b>Prediction:</b> {result.prediction === 1 ? <span className="fraud">FRAUDE</span> : <span className="nofraud">NO FRAUDE</span>}
              </div>
              <div>
                <b>Probability:</b> {(result.probability * 100).toFixed(2)}%
              </div>
            </>
          )}
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 40px auto;
          padding: 24px;
          background: #f8fafc;
          border-radius: 16px;
          box-shadow: 0 4px 24px #0001;
        }
        h1 {
          text-align: center;
          margin-bottom: 24px;
          color: #1e293b;
        }
        .card {
          background: #fff;
          padding: 16px 20px;
          border-radius: 10px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px #0001;
        }
        .label {
          display: flex;
          flex-direction: column;
          margin-bottom: 12px;
          font-size: 15px;
          color: #334155;
        }
        .textarea {
          margin-top: 6px;
          padding: 8px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          font-size: 15px;
          resize: vertical;
        }
        .form {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px #0001;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 18px;
        }
        .input {
          margin-top: 4px;
          padding: 7px 10px;
          border-radius: 6px;
          border: 1px solid #cbd5e1;
          font-size: 15px;
        }
        .button {
          background: #2563eb;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 10px 22px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.2s;
        }
        .button:disabled {
          background: #94a3b8;
          cursor: not-allowed;
        }
        .result {
          margin-top: 32px;
          background: #f1f5f9;
          padding: 18px 24px;
          border-radius: 10px;
          text-align: center;
          font-size: 18px;
        }
        .fraud {
          color: #dc2626;
          font-weight: bold;
        }
        .nofraud {
          color: #16a34a;
          font-weight: bold;
        }
        .error {
          color: #dc2626;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}