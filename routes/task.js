import express from "express";
import {
  createTask,
  deleteSingleTask,
  getAllTasks,
  getMyTask,
  getTaskById,
  markAsCompleted,
  updateTaskById,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllTasks);
router.post("/create", isAuthenticated, createTask);
router.get("/mytask", isAuthenticated, getMyTask);
router.delete("/:id", isAuthenticated, deleteSingleTask);
router.put("/complete/:id", isAuthenticated, markAsCompleted);
router.put("/:id", isAuthenticated, updateTaskById);
router.get("/:id", getTaskById);

export default router;
