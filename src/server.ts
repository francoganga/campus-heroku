import express from 'express';
import dotenv from 'dotenv';
import api from './routes/api';
import cors from 'cors';

dotenv.config({ path: '.env' });

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);

const PORT = process.env.PORT || 8000;

app.use('/api', api);

app.listen(PORT, () => {
  console.log(`Server running in ${PORT} on ${process.env.NODE_ENV}`);
});
