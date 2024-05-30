import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import todoRoutes from "./routes/todo";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/todos", todoRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
