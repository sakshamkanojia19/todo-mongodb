const express = require("express");
const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");

const router = express.Router();


const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ error: "Invalid token" });
  }
};


router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.user.userId });
  res.json(todos);
});


router.post("/", authMiddleware, async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ userId: req.user.userId, text });
  await todo.save();
  res.json(todo);
});


router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});


router.put("/:id", authMiddleware, async (req, res) => {
  const { text, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(req.params.id, { text, completed }, { new: true });
  res.json(todo);
});

module.exports = router;
