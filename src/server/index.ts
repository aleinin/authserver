import { config } from 'dotenv'
import express from 'express'
import { isPopulatedString } from '../util/is-populated-string'

const dotenvResult = config()
if (dotenvResult.error || !isPopulatedString(process.env.SECRET)) {
  console.log(process.env.SECRET)
  console.error('SECRET env variable must be set')
  process.exit(1)
}
export const SECRET = process.env.SECRET

const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})
