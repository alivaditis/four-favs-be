import express from 'express'
import router from './router'
import cors from 'cors'
import { protect } from './modules/auth'
import { getUser, createNewUser, signIn } from './handlers/user'

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
app.post('/api/v0/user', createNewUser)
app.post('/api/v0/signin', signIn)

app.use('/api/v0/', protect, router)


export default app