import { Router } from 'express';
import userRoutes from './userRoutes';
import campaignRoutes from './campaignRoutes';

const router = Router();

router.use(userRoutes);
router.use(campaignRoutes);

export default router;
