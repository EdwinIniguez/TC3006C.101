import { useState } from 'react';
   import axios from 'axios';

   const Home = () => {
       const [inputData, setInputData] = useState({});
       const [result, setResult] = useState(null);

       const handleChange = (e) => {
           setInputData({ ...inputData, [e.target.name]: e.target.value });
       };

       const handleSubmit = async (e) => {
           e.preventDefault();
           try {
               const response = await axios.post('/api/predict', inputData);
               setResult(response.data);
           } catch (error) {
               console.error(error);
           }
       };

       return (
           <div>
               <h1>Fraud Detection</h1>
               <form onSubmit={handleSubmit}>
                   {/* Add input fields for your model features */}
                   <input type="text" name="feature1" onChange={handleChange} placeholder="Feature 1" required />
                   <input type="text" name="feature2" onChange={handleChange} placeholder="Feature 2" required />
                   {/* Add more fields as necessary */}
                   <button type="submit">Check Fraud</button>
               </form>
               {result && <div>Prediction: {result.prediction}</div>}
           </div>
       );
   };

   export default Home;