const express = require("express");
const router = express.Router();
const pool = require("../db");

const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["Pending", "In Progress", "Completed"];

// GET /api/tasks
router.get("/", async (req, res) => {
  try {
    const [tasks] = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// GET /api/tasks/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);

    if (!tasks.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(tasks[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch task" });
  }
});

// POST /api/tasks
router.post("/", async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    if (!title || !description || !priority || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!PRIORITIES.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const [result] = await pool.query(
      "INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)",
      [title, description, priority, status]
    );

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create task" });
  }
});

// PUT /api/tasks/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    if (!title || !description || !priority || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!PRIORITIES.includes(priority)) {
      return res.status(400).json({ message: "Invalid priority" });
    }
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const [result] = await pool.query(
      "UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?",
      [title, description, priority, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update task" });
  }
});

// DELETE /api/tasks/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;