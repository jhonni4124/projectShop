import express from 'express';
import morgan from "morgan";
import cors from "cors";

import authRoutes from "./routes/auth.routs";

import { corsOption } from './config'; 

const app = express();

app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.use((req, res, next) => {
  const error = new Error("Not found");
    res.status(404).json([
        {
        message: error.message,
        },
    ]);
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(error.status || 500).json([
      {
          message: error.message,
      },
  ]);
});

export default app;