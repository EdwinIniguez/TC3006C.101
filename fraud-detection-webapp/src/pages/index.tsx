import React from 'react';
import FraudForm from '../components/FraudForm';

const Home = () => {
    return (
        <div>
            <h1>Fraud Detection</h1>
            <p>Enter the details below to check for potential fraud.</p>
            <FraudForm />
        </div>
    );
};

export default Home;