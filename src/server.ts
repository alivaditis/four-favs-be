import express from 'express'
import router from './router'
import cors from 'cors'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { protect } from './modules/auth'
import { getUser, getUsers, createNewUser, signIn } from './handlers/user'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
  console.log('hello from express')
  res.status(200)
  res.json({message: 'hello'})
})

app.get('/api/v0/user/:username', getUser)
app.get('/api/v0/users', getUsers)
app.post('/api/v0/user', [body('username').isString(), body('password').isString()], handleInputErrors, createNewUser)
app.post('/api/v0/signin', [body('username').isString(), body('password').isString()], handleInputErrors, signIn)

app.use('/api/v0/', protect, router)

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: 'not authorized'})
  } else if (err.type === "input") {
    res.status(400).json({message: 'invalid input'})
  } else {
    res.status(500).json({message: 'server error'})
  }
})

export default app