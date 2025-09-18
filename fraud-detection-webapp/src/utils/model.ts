import { loadModel } from '@tensorflow/tfjs-node';
import * as fs from 'fs';

let model: any;

export const loadTrainedModel = async () => {
    if (!model) {
        model = await loadModel('file://model/model.pkl');
    }
    return model;
};

export const preprocessInput = (inputData: any) => {
    // Implement preprocessing logic based on the model's requirements
    // This may include scaling, encoding categorical variables, etc.
    return inputData;
};

export const predictFraud = async (inputData: any) => {
    const processedData = preprocessInput(inputData);
    const model = await loadTrainedModel();
    const prediction = model.predict(processedData);
    return prediction;
};