import fs from 'node:fs'
import { Skin } from 'types/skin'

export class AvailableSkinsService {
  skins: Skin[]

  constructor() {
    this.skins = this.readAvailableSkins()
  }

  private readAvailableSkins = () => {
    const content = fs.readFileSync('availableSkins.json')
    return JSON.parse(content.toString())
  }

  findSkin = (id: number): Skin | undefined => {
    return this.skins.find(e => e.id == id)
  }

  getSkins = () => {
    return this.skins
  }
}
