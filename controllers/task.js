import Task from '../models/task.js';

const createTask = async (req, res) => {
  const { name, description, isCompleted, user } = req.body;
  try {
    const task = await Task.create({
      name,
      description,
      isCompleted,
      user,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteSingleTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateTaskById = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export {
  createTask,
  getAllTasks,
  deleteSingleTask,
  getTaskById,
  updateTaskById,
};
