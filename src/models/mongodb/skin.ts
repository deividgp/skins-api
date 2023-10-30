import { MongoClient } from 'mongodb'
import config from '../../config/config'
import { ISkinModel, Skin } from 'types/skin'

const client = new MongoClient(config.MONGO_URI)

async function connect() {
  try {
    await client.connect()
    const database = client.db('database')
    const collection = database.collection('skins')
    collection.createIndex({ id: 1 }, { unique: true })
    return collection
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class SkinModel implements ISkinModel {
  async getAll(): Promise<object | null> {
    const db = await connect()

    if (!db) return null

    return db.find({}).toArray()
  }

  async getById(id: number): Promise<object | null> {
    const db = await connect()

    if (!db) return null

    return db.findOne({ id: id })
  }

  async create(input: Skin): Promise<Skin | null> {
    const db = await connect()

    if (!db) return null

    try {
      await db.insertOne(input)
      return input
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async delete(id: number): Promise<boolean> {
    const db = await connect()

    if (!db) return false

    const { deletedCount } = await db.deleteOne({ id: id })
    return deletedCount > 0
  }

  async update(input: Skin): Promise<object | null> {
    const db = await connect()

    if (!db) return null

    const updated = await db.findOneAndUpdate(
      { id: input.id },
      {
        $set: {
          color: input.color,
        },
      },
      {
        returnDocument: 'after',
      },
    )

    return updated
  }
}
