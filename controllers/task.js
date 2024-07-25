import Task from "../models/task.js";

const createTask = async (req, res) => {
  const { name, description } = req.body;
  try {
    const task = await Task.create({
      name,
      description,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const deleteSingleTask = async (req, res) => {
  const user = req.user;
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: `Task deleted successfully BY: ${user.name}`,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getMyTask = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

const markAsCompleted = async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: `Task updated successfully to ${!task.isCompleted} `,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createTask,
  getAllTasks,
  deleteSingleTask,
  getTaskById,
  updateTaskById,
  getMyTask,
  markAsCompleted,
};
