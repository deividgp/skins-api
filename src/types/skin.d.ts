export interface ISkinModel {
  getAll: () => Promise<object | null>
  getById: (id: number) => Promise<object | null>
  create: (input: Skin) => Promise<Skin | null>
  delete: (id: number) => Promise<boolean>
  update: (input: Skin) => Promise<object | null>
}

export type Skin = {
  id: number
  name: string
  type: string
  price: number
  color: string
}
