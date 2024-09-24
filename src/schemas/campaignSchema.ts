import Joi from 'joi';

export const campaignSchema = Joi.object({
  nome: Joi.string().required(),
  dataInicio: Joi.date().iso().required().greater('now'),
  dataFim: Joi.date().iso().required().greater(Joi.ref('dataInicio')),
  status: Joi.string().valid('ativa', 'pausada', 'expirada').required(),
  categoria: Joi.string().valid('Marketing', 'Tecnologia', 'Vendas').required(),
});
