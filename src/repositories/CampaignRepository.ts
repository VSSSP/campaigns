import { Repository, IsNull } from 'typeorm';
import { Campaign } from '../domain/entities/Campaign';
import { ICampaignRepository } from '../domain/interfaces/ICampaignRepository';
import { AppDataSource } from '../data-source';

export class CampaignRepository implements ICampaignRepository {
  private ormRepository: Repository<Campaign>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Campaign);
  }

  async create(campaign: Campaign): Promise<Campaign> {
    const newCampaign = this.ormRepository.create(campaign);
    return await this.ormRepository.save(newCampaign);
  }

  async findAll(): Promise<Campaign[]> {
    return await this.ormRepository.find({ where: { deletedAt: IsNull() } });
  }

  async findById(id: string): Promise<Campaign | null> {
    return await this.ormRepository.findOneBy({ id });
  }
  
  async update(campaign: Campaign): Promise<Campaign> {
    return await this.ormRepository.save(campaign);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}
