const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// Get all tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id }).populate(
      "assignedTo",
      "name email",
    );
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } =
      req.body;
    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user.id,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
