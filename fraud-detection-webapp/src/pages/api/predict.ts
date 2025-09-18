import { NextApiRequest, NextApiResponse } from 'next';
import { loadModel, preprocessInput } from '../../utils/model';

let model: any;

const loadModelOnce = async () => {
    if (!model) {
        model = await loadModel();
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        await loadModelOnce();
        
        const inputData = req.body;
        const processedData = preprocessInput(inputData);
        
        const prediction = model.predict(processedData);
        
        res.status(200).json({ prediction });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}