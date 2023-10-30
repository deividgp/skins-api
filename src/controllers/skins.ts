import { ISkinModel } from 'types/skin'
import { AvailableSkinsService } from '../services/availableSkins'
import { Request, Response } from 'express'
import { validateSkin, validatePartialSkin } from 'schemas/skins'

const availableSkins = new AvailableSkinsService()

export class SkinController {
  skinModel: ISkinModel

  constructor(skinModel: ISkinModel) {
    this.skinModel = skinModel
  }

  getAvailableSkins = async (_req: Request, res: Response) => {
    return res.json(availableSkins.getSkins())
  }

  buySkin = async (req: Request, res: Response) => {
    if (!req.body.id) return res.status(400).json({ error: 'Missing id' })

    const foundSkin = availableSkins.findSkin(req.body.id)

    if (!foundSkin) return res.status(404).json({ error: 'Skin not found' })

    const result = validateSkin(foundSkin)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const skin = await this.skinModel.create(foundSkin)

    if (!skin) return res.status(500).json({ error: "Can't add skin" })

    return res.json(skin)
  }

  getAcquiredSkins = async (_req: Request, res: Response) => {
    const skins = await this.skinModel.getAll()

    return res.json(skins)
  }

  changeSkinColor = async (req: Request, res: Response) => {
    const id = req.body.id
    const color = req.body.color

    if (!id) return res.status(400).json({ error: 'Missing id' })
    if (!color) return res.status(400).json({ error: 'Missing color' })

    const result = validatePartialSkin(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const updatedSkin = await this.skinModel.update(req.body)

    if (!updatedSkin)
      return res.status(500).json({ error: "Can't update skin" })

    return res.json(updatedSkin)
  }

  deleteSkin = async (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ error: 'Missing id' })

    const skin = await this.skinModel.delete(+id)

    if (!skin) return res.status(404).json({ error: "Can't delete skin" })

    return res.json('Skin deleted')
  }

  getSkin = async (req: Request, res: Response) => {
    const id = req.params.id

    if (!id) return res.status(400).json({ error: 'Missing id' })

    const skin = await this.skinModel.getById(+id)

    if (!skin) return res.status(404).json({ error: 'Skin not found' })

    return res.json(skin)
  }
}
