import express from "express";
import {
  createTask,
  deleteSingleTask,
  getAllTasks,
  getMyTask,
  getTaskById,
  updateTaskById,
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllTasks);
router.post("/create", isAuthenticated, createTask);
router.get("/mytask", isAuthenticated, getMyTask);
router.delete("/:id", isAuthenticated, deleteSingleTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTaskById);

export default router;
