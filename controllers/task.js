import CustomError from "../middlewares/error.js";
import Task from "../models/task.js";

const createTask = async (req, res, next) => {
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
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleTask = async (req, res, next) => {
  const user = req.user;
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: `Task deleted successfully BY: ${user.name}`,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateTaskById = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const getMyTask = async (req, res, next) => {
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
    next(error);
  }
};

const markAsCompleted = async (req, res, next) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return next(new CustomError("Task not found", 400));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: `Task updated successfully to ${!task.isCompleted} `,
    });
  } catch (error) {
    next(error);
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
