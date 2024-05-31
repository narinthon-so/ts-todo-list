import { Router, Request, Response } from "express";
import { Todo } from "../models/todo";

const router = Router();

let todos: Todo[] = [];
let currentId = 1;

// Get all to-dos
router.get("/", (req: Request, res: Response) => {
  res.json(todos);
});

// Get a single to-do by ID
router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).send("To-Do not found");
  }
});

// Create a new to-do
router.post("/", (req: Request, res: Response) => {
  const newTodo: Todo = {
    id: currentId++,
    title: req.body.title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a to-do
router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos[index] = {
      id,
      title: req.body.title,
      completed: req.body.completed,
    };
    res.json(todos[index]);
  } else {
    res.status(404).send("To-Do not found");
  }
});

// Delete a to-do
router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex((t) => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send("To-Do not found");
  }
});

// Clear
router.post("/clear", (req: Request, res: Response) => {
  todos = [];
  res.json("Removed all todo");
});

// Ping
router.post("/ping", (req: Request, res: Response) => {
  res.json("pong");
});

export default router;
