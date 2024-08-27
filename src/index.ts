import express, { Request, Response } from "express";
import cors from "cors";
import dbconnect from "./utils/dbconnect";
import dotenv from "dotenv";
import BookingRoutes from "./routes/BookingRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import UserRoutes from "./routes/UserRoutes";
import ServiceRoutes from "./routes/ServiceRoute";
import cookieParser from 'cookie-parser';
import SpaceRoutes from './routes/SpaceRoute';
import creditRoutes from "./routes/creditRoute";

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 3000;

dotenv.config({ path: "backend/.env" });
dbconnect().catch(err => console.error("Database connection error:", err));

app.use(express.json());

let allowedOrigins: string[];

  allowedOrigins = [
    "https://www.603thecoworkingspace.com",
    "https://603-cws-frontend.vercel.app",
    'https://603coworkingspace-piyush-joshis-projects.vercel.app',
    'http://localhost:5173'
  ];



app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin!) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use("/api/v1/services", ServiceRoutes);
app.use("/api/v1/spaces", SpaceRoutes);
app.use("/api/v1/bookings", BookingRoutes);
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/credits", creditRoutes);

app.get("/", (req: Request, res: Response) => {
  console.log("Root URL accessed");
  res.send("Welcome to the API");
});

// Catch-all route for undefined routes
app.use((req: Request, res: Response) => {
  console.log("Undefined route accessed:", req.originalUrl);
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
