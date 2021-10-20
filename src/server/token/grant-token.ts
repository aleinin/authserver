import { RequestHandler } from 'express'
import { sign } from 'jsonwebtoken'
import { SECRET } from '..'
import { Token } from '../models/token'
import { v4 as uuid } from 'uuid'
import { User } from '../models/schemas/user'
import { InternalServerError } from '../responses'
import { TokenResponse } from '../models/token-response'

const ONE_DAY = 60 * 60 * 24
/**
 * POST /token
 *
 * Exchanges access codes for tokens
 *
 * Used by: Clients on behalf of the resource owner
 *
 * @param req express request
 * @param res express response
 *
 *
 */
export const grantToken: RequestHandler = (req, res) => {
  const user: User = res.locals.user
  if (user == null) {
    return InternalServerError(res, 'res locals user not set')
  }
  const payload: Token = {
    iss: 'auth.aleinin.com',
    sub: user.name,
    aud: [], // todo
    exp: Math.round(Date.now() / 1000) + ONE_DAY,
    jti: uuid(),
    context: {
      user: {
        name: user.name,
        fullName: user.fullName,
      },
      apps: [], // todo
    },
  }
  const token = sign(payload, SECRET)
  const response: TokenResponse = {
    token,
    token_type: 'Bearer',
    expires: ONE_DAY,
  }
  res.json(response)
}
