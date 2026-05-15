import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "./authRepository";

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role?: 'professor' | 'aluno';
}

export async function register(data: RegisterData) {
    const {name, email, password, role = 'aluno'} = data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error('Usuário já cadastrado');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await createUser({
        name,
        email,
        password: hashPassword,
        role
    });
}

export async function login(data: Omit<RegisterData, 'name'>) {
    const { email, password } = data;

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Senha incorreta');
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
            role: user.role,
            name: user.name
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return token;
}