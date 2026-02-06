import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";

const app: Application = express();
app.use(express.json());

//* Routes
app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({ success: true, message: "Server is created" });
});

export default app;
