import { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { SECRET } from '.'
import { createAuthResponse } from './models/auth-response'

const BEARER = 'Bearer '

/**
 * POST /token/verify
 *
 * Verifies the token supplied in the body is valid
 * (not expired, signed by this auth server)
 *
 * Used by: Resource servers
 *
 * @param req express request
 * @param res express response
 *
 *
 */
export const verifyToken: RequestHandler = (req, res) => {
  const token: string | undefined = req.body.token
  if (token != null && token.startsWith(BEARER)) {
    const jwt = token.slice(BEARER.length, token.length)
    verify(jwt, SECRET, (err, decoded) => {
      res.status(200)
      if (err != null || decoded == null) {
        return res.json(createAuthResponse(false, 'Invalid token'))
      } else {
        return res.json(createAuthResponse(true, 'Valid token'))
      }
    })
  } else {
    res.status(400)
    res.json(createAuthResponse(false))
  }
}
