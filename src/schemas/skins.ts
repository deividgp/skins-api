import { Skin } from 'types/skin'
import z from 'zod'

const skinSchema = z.object({
  id: z.number().int().min(1),
  name: z.string(),
  type: z.string(),
  price: z.number().min(0),
  color: z.string(),
})

export function validateSkin(input: Skin) {
  return skinSchema.safeParse(input)
}

export function validatePartialSkin(input: Skin) {
  return skinSchema.partial().safeParse(input)
}
