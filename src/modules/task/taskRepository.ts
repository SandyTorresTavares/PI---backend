import connection from "../../database/connection";

interface TaskData {
    title: string;
    description: string;
    createdBy: number;
}

export const createTask = async (taskData: TaskData) => {
    const { title, description, createdBy } = taskData;
    const [result] = await connection.execute(
        'INSERT INTO tasks (title, description, created_by) VALUES (?, ?, ?)',
        [title, description, createdBy]
    );
    return result;
};

export const getTasksByProfessor = async (professorId: number, page: number = 1, perPage: number = 10) => {
    const offset = (page - 1) * perPage;
    const [rows] = await connection.execute(
        `SELECT * FROM tasks WHERE created_by = ? LIMIT ${perPage} OFFSET ${offset}`,
        [professorId]
    );
    return rows;
};

export const getTasksForStudent = async (studentId: number, page: number = 1, perPage: number = 10, completed?: boolean) => {
    const offset = (page - 1) * perPage;
    let sql = `SELECT t.*, tp.completed FROM tasks t
         LEFT JOIN task_progress tp ON t.id = tp.task_id AND tp.user_id = ?`;
    const params: any[] = [studentId];

    if (completed === false) {
        sql += ' WHERE tp.completed = 0 OR tp.completed IS NULL';
    } else if (completed === true) {
        sql += ' WHERE tp.completed = 1';
    }

    sql += ` LIMIT ${perPage} OFFSET ${offset}`;

    const [rows] = await connection.execute(sql, params);
    return rows;
};

export const updateTask = async (taskId: number, taskData: { title: string; description: string }, userId: number) => {
    // Verificar se o usuário é o criador da tarefa
    const [existingTask]: any = await connection.execute(
        'SELECT created_by FROM tasks WHERE id = ?',
        [taskId]
    );
    if (existingTask.length === 0) {
        throw new Error('Tarefa não encontrada');
    }
    if (existingTask[0].created_by !== userId) {
        throw new Error('Apenas o criador pode editar a tarefa');
    }

    const { title, description } = taskData;
    await connection.execute(
        'UPDATE tasks SET title = ?, description = ? WHERE id = ?',
        [title, description, taskId]
    );
};

export const deleteTask = async (taskId: number, userId: number) => {
    // Verificar se o usuário é o criador da tarefa
    const [existingTask]: any = await connection.execute(
        'SELECT created_by FROM tasks WHERE id = ?',
        [taskId]
    );
    if (existingTask.length === 0) {
        throw new Error('Tarefa não encontrada');
    }
    if (existingTask[0].created_by !== userId) {
        throw new Error('Apenas o criador pode deletar a tarefa');
    }

    await connection.execute(
        'DELETE FROM tasks WHERE id = ?',
        [taskId]
    );
};