import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todo";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
