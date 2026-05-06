import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { createTask, getTasks, updateTask, deleteTask, updateTaskStatus } from "../modules/task/taskController";

const router = Router();

router.post('/', authenticateToken, createTask);
router.get('/', authenticateToken, getTasks);
router.put('/:id', authenticateToken, updateTask);
router.put('/:id/progress', authenticateToken, updateTaskStatus);
router.delete('/:id', authenticateToken, deleteTask);

export default router;
