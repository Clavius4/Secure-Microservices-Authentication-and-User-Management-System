// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { RoleUser } from "../models/User";

function verifyToken(token: any) {
    return {id: "", role: undefined};
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = verifyToken(token) as unknown as { id: string; role: RoleUser };
        req.user = decoded; // `user` is now recognized
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}

export function authorize(roles: RoleUser[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    };
}
