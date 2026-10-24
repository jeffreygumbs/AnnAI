import express from 'express';
import * as dotenv from 'dotenv';
import {GoogleGenAI} from '@google/genai';

dotenv.config();

const router = express.Router();

let ai;
const getAI = () =>
  (ai ??= new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY}));

router.route('/').get((req, res) => {
  res.send('Hello from Ann AI post');
});

router.route('/').post(async (req, res) => {
  try {
    const {prompt} = req.body;
    const response = await getAI().models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
    });
    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData?.data
    );
    if (!imagePart) {
      throw new Error('No image was generated, please try again');
    }
    res.status(200).json({photo: imagePart.inlineData.data});
  } catch (error) {
    console.log(error);
    res.status(500).json(error?.message || 'Image generation failed');
  }
});

export default router;
