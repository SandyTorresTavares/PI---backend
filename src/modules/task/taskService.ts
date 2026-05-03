import * as taskRepository from "./taskRepository";

interface Task {
    id: number;
    title: string;
    description: string;
    created_by: number;
    created_at: Date;
}

interface User {
    userId: number;
    role: 'professor' | 'aluno';
}

interface GetTasksOptions {
    page?: number;
    perPage?: number;
    completed?: boolean;
}

interface TaskProgress {
    taskId: number;
    userId: number;
    completed: boolean;
} // Depois eu subo kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

export const createTask = async (taskData: { title: string; description: string; createdBy: number }) => {
    return await taskRepository.createTask(taskData);
};

export const getTasks = async (user: User, options: GetTasksOptions = {}) => {
    const page = options.page ?? 1;
    const perPage = options.perPage ?? 10;

    if (user.role === 'professor') {
        return await taskRepository.getTasksByProfessor(user.userId, page, perPage);
    } else {
        return await taskRepository.getTasksForStudent(user.userId, page, perPage, options.completed);
    }
};

export const updateTask = async (taskId: number, taskData: { title: string; description: string }, user: User) => {
    if (user.role !== 'professor') {
        throw new Error('Apenas professores podem editar tarefas');
    }
    return await taskRepository.updateTask(taskId, taskData, user.userId);
};

export const deleteTask = async (taskId: number, user: User) => {
    if (user.role !== 'professor') {
        throw new Error('Apenas professores podem deletar tarefas');
    }
    return await taskRepository.deleteTask(taskId, user.userId);
};