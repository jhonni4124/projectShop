import { CorsOptions } from "cors";
import { config } from "dotenv";

config();

export const JWT_SECRET = process.env.JWT_SECRET || "mySecretKey";

const origin = process.env.ORIGIN || "http://localhost:5173";
export const PORT = process.env.PORT || 3000;

export const corsOption: CorsOptions = {
    origin: [origin],
    credentials: true,
};