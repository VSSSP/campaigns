import { Router } from 'express';
import { CampaignController } from '../controllers/CampaignController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { campaignSchema } from '../schemas/campaignSchema';

const router = Router();
const campaignController = new CampaignController();

router.use(authMiddleware);

router.post(
  '/campaigns',
  validationMiddleware(campaignSchema),
  campaignController.create.bind(campaignController),
);

router.get('/campaigns', campaignController.findAll.bind(campaignController));
router.get('/campaigns/:id', campaignController.findById.bind(campaignController));

router.put(
  '/campaigns/:id',
  validationMiddleware(campaignSchema),
  campaignController.update.bind(campaignController),
);

router.delete('/campaigns/:id', campaignController.delete.bind(campaignController));

export default router;
