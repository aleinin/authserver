import { RequestHandler } from 'express'
import { verify } from 'jsonwebtoken'
import { SECRET } from '.'
import { AuthorizationResponse } from './models/authorization-response'
import { BadRequest } from './responses'

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
  const token: string | undefined = req.body?.token
  if (token == null || !token.startsWith(BEARER)) {
    return BadRequest(res)
  }
  const jwt = token.slice(BEARER.length, token.length)
  verify(jwt, SECRET, (err, decoded) => {
    const response: AuthorizationResponse<{ valid: boolean }> = {
      success: true,
    }
    if (err != null || decoded == null) {
      response.message = 'Invalid token'
      response.data = { valid: false }
      return res.json(response)
    } else {
      response.message = 'Valid token'
      response.data = { valid: true }
      return res.json(response)
    }
  })
}
