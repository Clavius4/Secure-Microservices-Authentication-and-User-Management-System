// express.d.ts
import { RoleUser } from './models/User';

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role: RoleUser;
            };
        }
    }
}
