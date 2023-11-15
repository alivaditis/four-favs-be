import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'
import { dot } from 'node:test/reporters'

app.listen(3001, () => {
  console.log('hello on http://localhost:3001')
})