import express from 'express';
import authRouter from './routes/router';
import taskRouter from './routes/taskRouter';

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/tasks', taskRouter);

export default app;