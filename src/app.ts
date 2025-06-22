import express, { Application, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './routes';
import config from './config';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: config.CLIENT_URL,
    credentials: true,
  }),
);

// application routes
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send({ success: true });
});

// not found route
app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
