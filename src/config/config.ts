const config = {
  PORT: process.env.PORT ?? '5000',
  MONGO_URI: process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017',
}

export default config
