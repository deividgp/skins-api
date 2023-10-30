import 'dotenv/config'
import config from './config/config'
import { createSkinRouter } from './routes/skin'
import { SkinModel } from './models/mongodb/skin'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

export const app = express()
app.use(helmet())
app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json())
app.use('/skins', createSkinRouter(new SkinModel()))
app.listen(config.PORT, () => {
  console.log(`server listening on port http://localhost:${config.PORT}`)
})
