// utils/jwt.util.ts
import jwt from 'jsonwebtoken';


export function generateToken(payload: object): string {
    const secret = process.env.JWT_SECRET || 'default_secret';
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

// export function verifyToken(token: string): any {
//     return jwt.verify(token, process.env.JWT_SECRET);
// }
