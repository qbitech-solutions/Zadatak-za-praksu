if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const connectDb = require("./config/connectDb");
const Todo = require("./Models/todo");
const tasksController = require("./controllers/tasksController");
const usersController = require("./controllers/usersController");

const app = express();
app.use(express.json());

connectDb();

app.post("/api/signup", usersController.signup);

app.post("/api/login", usersController.login);

app.post("/api/tasks", tasksController.addNewTask);

app.delete("/api/tasks/:id", tasksController.deleteTask);

app.put("/api/tasks/:id", tasksController.updateTask);

app.listen(process.env.PORT);
