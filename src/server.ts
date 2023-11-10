import express from 'express'
import router from './router'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({message: 'hello'})
})

app.use('/api/v0/', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

export default app