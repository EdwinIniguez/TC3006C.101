# Fraud Detection Web Application

This project is a web application for detecting fraudulent activities using a trained machine learning model. It is built with Next.js and TypeScript, providing a user-friendly interface for inputting data and receiving predictions.

## Project Structure

```
fraud-detection-webapp
├── public
│   └── favicon.ico          # Favicon for the web application
├── src
│   ├── components
│   │   └── FraudForm.tsx    # Component for the fraud detection form
│   ├── pages
│   │   ├── api
│   │   │   └── predict.ts    # API route for fraud prediction
│   │   └── index.tsx         # Main entry point of the application
│   ├── utils
│   │   └── model.ts          # Utility functions for model handling
│   └── styles
│       └── globals.css       # Global CSS styles
├── model
│   └── model.pkl             # Serialized trained model
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
├── next.config.js            # Next.js configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd fraud-detection-webapp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

- The main page will display a form where users can input data for fraud detection.
- Upon submission, the data will be sent to the API endpoint, which will return a prediction based on the trained model.

## Deployment

This application can be deployed on Vercel. Follow the Vercel documentation for deployment instructions.

## License

This project is licensed under the MIT License.