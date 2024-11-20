import { Router } from 'express';
import {syncRoles} from "../controllers/roleController";
import {createUser, readUser, softDeleteUser, updateUser} from "../controllers/userController";



const router = Router();

router.post('/', createUser);
router.get('/:id', readUser);
router.put('/:id', updateUser);
router.delete('/:id', softDeleteUser);
router.post('/sync', syncRoles);


export default router;
