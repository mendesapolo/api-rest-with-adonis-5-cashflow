import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cashflow from '../../Models/Cashflow';

export default class CashflowsController {

  public async index({ response }: HttpContextContract) {
    const data = await Cashflow.query()
      .select('*')
      .where('is_deleted', false)
      .orderBy('created_at', 'desc')

    return response.ok({
      data
    })
  }

  public async show({ params, response }: HttpContextContract) {
    const cash = await Cashflow.query()
      .select('*')
      .where('is_deleted', false)
      .andWhere('id', params.id)
      .first()
    if (!cash) return response.badRequest({ message: 'Dados não encontrado' })
    return response.ok({
      data: cash.toJSON()
    })
  }

  public async create({ request, response }: HttpContextContract) {
    const payload = { ...request.only(['descricao', 'valor', 'is_entrada']) }
    if (!payload.descricao || !payload.valor) return response.badRequest({ message: 'Preencha todos os campos' })

    payload.is_entrada = payload.is_entrada ? true : false

    const cash = await Cashflow.create(payload)
    return response.created({
      data: cash.toJSON()
    })
  }

  public async update({ params, request, response }: HttpContextContract) {
    const payload = { ...request.only(['descricao', 'valor', 'is_entrada']) }

    if (!payload.descricao || !payload.valor) return response.badRequest({ message: 'Preencha todos os campos' })
    payload.is_entrada = payload.is_entrada ? true : false

    const cash = await Cashflow.find(params.id)
    if (!cash) return response.badRequest({ message: 'Dados não encontrado' })

    cash.merge(payload)
    await cash.save()

    return response.ok({
      data: cash.toJSON()
    })
  }

  public async delete({ params, response }: HttpContextContract) {
    const cash = await Cashflow.find(params.id)

    if (!cash) return response.badRequest({ message: 'Dados não encontrado' })

    cash.merge({ isDeleted: true })
    await cash.save()

    return response.ok({
      message: 'Deletado com sucesso'
    })
  }
}
