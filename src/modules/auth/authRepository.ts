import connection from "../../database/connection";
import { ResultSetHeader } from "mysql2";

export async function findUserByEmail(email: string){
    const[row]: any = await connection.query(
        'SELECT * FROM users WHERE email = ?', [email]
    );
    return row.length ? row [0] : null;
}

export async function createUser(user: {name: string, email: string, password: string, role?: string}){

    const {name, email, password, role = 'aluno'} = user;
    const [result] = await connection.query<ResultSetHeader>(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]
    );

    return;
};