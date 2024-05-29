import request from "supertest";
import express from "express";
import todoRoutes from "../routes/todo";
import { Todo } from "../models/todo";

const app = express();
app.use(express.json());
app.use("/api/todos", todoRoutes);

describe("To-Do List API", () => {
  let todoId: number;

  it("should create a new to-do", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ title: "Test To-Do" })
      .expect(201);

    const newTodo: Todo = response.body;
    expect(newTodo.title).toBe("Test To-Do");
    expect(newTodo.completed).toBe(false);
    todoId = newTodo.id;
  });

  it("should get all to-dos", async () => {
    const response = await request(app).get("/api/todos").expect(200);

    const todos: Todo[] = response.body;
    expect(todos.length).toBeGreaterThan(0);
  });

  it("should get a to-do by ID", async () => {
    const response = await request(app).get(`/api/todos/${todoId}`).expect(200);

    const todo: Todo = response.body;
    expect(todo.id).toBe(todoId);
    expect(todo.title).toBe("Test To-Do");
    expect(todo.completed).toBe(false);
  });

  it("should update a to-do", async () => {
    const response = await request(app)
      .put(`/api/todos/${todoId}`)
      .send({ title: "Updated Test To-Do", completed: true })
      .expect(200);

    const updatedTodo: Todo = response.body;
    expect(updatedTodo.title).toBe("Updated Test To-Do");
    expect(updatedTodo.completed).toBe(true);
  });

  it("should delete a to-do", async () => {
    await request(app).delete(`/api/todos/${todoId}`).expect(204);

    await request(app).get(`/api/todos/${todoId}`).expect(404);
  });
});
