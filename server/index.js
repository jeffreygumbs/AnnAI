import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import annAiRoutes from './routes/annAiRoutes.js';

dotenv.config();

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/ann', annAiRoutes);

const PORT = process.env.PORT || 8080;

app.get('/', async (req, res) => {
  res.send('Hello from Ann AI');
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
