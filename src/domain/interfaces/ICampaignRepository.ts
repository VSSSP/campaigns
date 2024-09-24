import { Campaign } from '../entities/Campaign';

export interface ICampaignRepository {
  create(campaign: Campaign): Promise<Campaign>;
  findAll(): Promise<Campaign[]>;
  findById(id: string): Promise<Campaign | null>;
  update(campaign: Campaign): Promise<Campaign>;
  delete(id: string): Promise<void>;
}
