import { Request, Response } from "express";
import * as taskService from "./taskService";

const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = (req as any).user;

    if (user.role !== 'professor') {
        return res.status(403).json({ error: 'Apenas professores podem criar tarefas' });
    }

    try {
        await taskService.createTask({ title, description, createdBy: user.userId });
        return res.status(201).json({ message: "Tarefa criada com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

const getTasks = async (req: Request, res: Response) => {
    const user = (req as any).user;
    const page = Math.max(Number(req.query.page) || 1, 1);
    const perPage = Math.max(Number(req.query.perPage) || 10, 1);
    const completedQuery = req.query.completed;
    const status = typeof req.query.status === 'string' ? req.query.status.toLowerCase() : undefined;

    let completed: boolean | undefined;

    if (typeof completedQuery === 'string') {
        if (completedQuery === 'true') {
            completed = true;
        } else if (completedQuery === 'false') {
            completed = false;
        } else {
            return res.status(400).json({ error: "completed inválido. Use true ou false" });
        }
    } else if (status) {
        if (status === 'pending') {
            completed = false;
        } else if (status === 'done') {
            completed = true;
        } else {
            return res.status(400).json({ error: "status inválido. Use 'pending' ou 'done'" });
        }
    }

    try {
        const tasks = await taskService.getTasks(user, { page, perPage, completed });
        return res.status(200).json({ tasks });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const user = (req as any).user;

    try {
        await taskService.updateTask(parseInt(id), { title, description }, user);
        return res.status(200).json({ message: "Tarefa atualizada com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = (req as any).user;

    try {
        await taskService.deleteTask(parseInt(id), user);
        return res.status(200).json({ message: "Tarefa deletada com sucesso" });
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

export { createTask, getTasks, updateTask, deleteTask };