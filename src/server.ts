import express from 'express'
import router from './router'
import { protect } from './modules/auth'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({message: 'hello'})
})

app.use('/api/v0/', protect, router)

export default app