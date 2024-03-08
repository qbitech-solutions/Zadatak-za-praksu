const Todo = require("../Models/todo");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");


const addNewTask = async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.sub);

    const todo = new Todo({
      title: req.body.title,
      description: req.body.description,
      user: user.username,
      priority: req.body.priority,
      status: "uncompleted",
    });

    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.status === "completed") {
      return res.status(400).json({ message: "Todo is already completed" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const findUncompletedTasks = async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const uncompletedTasks = await Todo.find({
      user: user.username,
      status: "uncompleted",
    });

    res.json(uncompletedTasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const findCompletedTasks = async (req, res) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.sub);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const uncompletedTasks = await Todo.find({
      user: user.username,
      status: "completed",
    });

    res.json(uncompletedTasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  addNewTask: addNewTask,
  deleteTask: deleteTask,
  updateTask: updateTask,
  findUncompletedTasks: findUncompletedTasks,
  findCompletedTasks: findCompletedTasks,
};
