import cors from 'cors'
import { config } from 'dotenv'
import express, { json, urlencoded } from 'express'
import { connect, connection } from 'mongoose'
import path from 'path'
import { catchError, first, from, Observable, timeout } from 'rxjs'
import { isPopulatedString } from '../util/is-populated-string'
import { grantAuthCode } from './auth-code/grant-auth-code'
import { login } from './auth-code/login'
import { validateClient } from './auth-code/validate-client'
import { grantToken } from './token/grant-token'
import { validateAuthCode } from './token/validate-auth-code'
import { verifyToken } from './verify-token'

const quit = (reason?: string) => {
  if (reason != null) {
    console.error(reason)
  }
  process.exit(1)
}

const setupExpress = (): Promise<string> => {
  return new Promise((resolve: (str: string) => void) => {
    const app = express()
    const port = 3001
    app.use(cors())
    app.use(json())
    app.use(
      urlencoded({
        extended: true,
      })
    )
    app.get('/', (req, res) => {
      res.send('UP')
    })
    app.use(
      '/authorize/login',
      express.static(path.join(__dirname, '../../dist/client/'))
    )
    app.post('/authorize', validateClient, login, grantAuthCode)
    app.post('/oauth/token', validateAuthCode, grantToken)
    app.post('/oauth/token/verify', verifyToken)
    app.listen(port, () => {
      resolve(`App is listening at http://localhost:${port}`)
    })
  })
}

const setupMongoose = (): Promise<string> => {
  return new Promise((resolve: (str: string) => void, reject) => {
    try {
      connect('mongodb://localhost/authserver')
    } catch (error) {
      console.error(error)
      return reject('Unable to connect to Mongo')
    }
    const db = connection
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      resolve('Connected to mongo')
    })
  })
}

const dotenvResult = config()
if (dotenvResult.error || !isPopulatedString(process.env.SECRET)) {
  // can't use quit due to TS not realzing program would end before export below
  console.error('SECRET env variable must be set')
  process.exit(1)
}
export const SECRET = process.env.SECRET
let expressReady = false
let mongooseReady = false
setupExpress()
  .then((message) => {
    console.log(message)
    expressReady = true
  })
  .catch(quit)
setupMongoose()
  .then((message) => {
    console.log(message)
    mongooseReady = true
  })
  .catch(quit)
setTimeout(() => {
  if (!expressReady || !mongooseReady) {
    console.error(
      `Timeout reached. expressReady: ${expressReady}, mongooseReady: ${mongooseReady}`
    )
  }
}, 5000)
