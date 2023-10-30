import { Router } from 'express'
import { SkinController } from '../controllers/skins'
import { ISkinModel } from 'types/skin'

export const createSkinRouter = (skinModel: ISkinModel) => {
  const router = Router()

  const skinController = new SkinController(skinModel)

  router.get('/available', skinController.getAvailableSkins)
  router.post('/buy', skinController.buySkin)
  router.get('/myskins', skinController.getAcquiredSkins)
  router.put('/color', skinController.changeSkinColor)
  router.delete('/delete/:id', skinController.deleteSkin)
  router.get('/getskin/:id', skinController.getSkin)

  return router
}
