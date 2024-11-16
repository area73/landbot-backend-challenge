import express, { type Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRouter } from "./routes/authRoutes";
import { apiRouter } from "./routes/apiRoutes";
import { config } from "./config";
import { verifyToken } from "./middleware/authMiddleware";

dotenv.config();
const app: Application = express();

app
  .use(cors()) // TODO: In production you should not use the wildcard * in the cors options and should restrict methods and stablish only needed headers.
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(config.authEntryPoint, authRouter) // not needed middleware to verify token
  .use(verifyToken) // any route after this middleware will require a valid token
  .use(config.apiEntryPoint, apiRouter);

export default app;
