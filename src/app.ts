import express from 'express';
import cors from 'cors';
import authRouter from './routes/router';
import taskRouter from './routes/taskRouter';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

export default app;