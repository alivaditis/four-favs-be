import express from 'express'
import router from './router'

const app = express()

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({message: 'hello'})
})

app.use('/api/v0/', router)

export default app