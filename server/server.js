if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const cors = require("cors");

const connectDb = require("./config/connectDb");
const tasksController = require("./controllers/tasksController");
const usersController = require("./controllers/usersController");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectDb();

app.post("/api/signup", usersController.signup);

app.post("/api/login", usersController.login);

app.get("/api/logout", usersController.logout);

app.post("/api/tasks", tasksController.addNewTask);

app.delete("/api/tasks/:id", tasksController.deleteTask);

app.put("/api/tasks/:id", tasksController.updateTask);

app.get("/api/uncompleted", tasksController.findUncompletedTasks);

app.get("/api/completed", tasksController.findCompletedTasks);

app.listen(process.env.PORT);
