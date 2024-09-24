import { Request, Response } from 'express';
import { CampaignUseCase } from '../usecase/Campaign';

export class CampaignController {
  private campaignUseCase = new CampaignUseCase();

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const campaign = await this.campaignUseCase.create(req.body);
      return res.status(201).json(campaign);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: 'An unknown error has occurred.' });
      }
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    const campaigns = await this.campaignUseCase.findAll();
    return res.json(campaigns);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const campaign = await this.campaignUseCase.findById(req.params.id);
      return res.json(campaign);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ message: error.message });
      } else {
        return res.status(404).json({ message: 'An unknown error has occurred.' });
      }
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const campaign = await this.campaignUseCase.update(req.params.id, req.body);
      return res.json(campaign);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: 'An unknown error has occurred.' });
      }
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const result = await this.campaignUseCase.delete(id);
      return res.status(204).json(result);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      } else {
        return res.status(400).json({ message: 'An unknown error has occurred.' });
      }
    }
  }
}
