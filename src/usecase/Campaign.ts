import { Repository, IsNull } from 'typeorm';
import { Campaign } from '../domain/entities/Campaign';
import { AppDataSource } from '../data-source';

export class CampaignUseCase {
  private campaignRepository: Repository<Campaign>;

  constructor() {
    this.campaignRepository = AppDataSource.getRepository(Campaign);
  }

  async create(data: Campaign): Promise<Campaign> {
    const campaign = this.campaignRepository.create(data);

    if (new Date(campaign.dataFim) <= new Date(campaign.dataInicio)) {
      throw new Error('A data fim deve ser maior que a data início.');
    }

    if (new Date(campaign.dataInicio) < new Date()) {
      throw new Error('A data início deve ser igual ou posterior à data atual.');
    }

    return await this.campaignRepository.save(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return await this.campaignRepository.find({ where: { deletedAt: IsNull() } });
  }

  async findById(id: string): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({ where: { id } });
    if (!campaign) {
      throw new Error('Campanha não encontrada.');
    }
    return campaign;
  }

  async update(id: string, data: Partial<Campaign>): Promise<Campaign> {
    const campaign = await this.findById(id);

    Object.assign(campaign, data);

    if (new Date(campaign.dataFim) <= new Date(campaign.dataInicio)) {
      throw new Error('A data fim deve ser maior que a data início.');
    }

    return await this.campaignRepository.save(campaign);
  }

  async delete(id: string): Promise<{ message: string; campaign: Campaign }> {
    await this.campaignRepository.softDelete(id);

    const deletedCampaign = await this.campaignRepository.findOne({ where: { id }, withDeleted: true });

    return {
      message: 'Campaign deleted successfully',
      campaign: deletedCampaign!,
    };
  }
}
