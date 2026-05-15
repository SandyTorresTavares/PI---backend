import { Request, Response } from "express";

export const getProfile = (req: Request, res: Response) => {
    // Acessar dados do usuário que vieram do token (via middleware)
    const name = (req as any).user.name;
    const userId = (req as any).user.userId;
    const email = (req as any).user.email;

    return res.status(200).json({
        message: "Perfil acessado com sucesso!",
        user: {
            name: name,
            id: userId,
            email: email,
        }
    });
};