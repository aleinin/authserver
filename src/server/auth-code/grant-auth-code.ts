import { RequestHandler } from 'express'
import { AuthorizationResponse } from '../models/authorization-response'
import { AuthorizationCodeModel } from '../models/schemas/authorization-code'
import { v4 as uuid } from 'uuid'
import { isPopulatedStrings } from '../../util/is-populated-string'
import { InternalServerError } from '../responses'

/**
 * POST /authorize/login
 *
 *
 * Used by login client to receive the authorization code
 *
 * returns and registers an authorization code
 *
 * Used by: Login client
 *
 * @param req express request
 * @param res express response
 *
 */
export const grantAuthCode: RequestHandler = (req, res) => {
  const username = res.locals.name
  const { clientId, redirectURI } = res.locals.request
  if (!isPopulatedStrings([username, clientId, redirectURI])) {
    return InternalServerError(
      res,
      'res.locals username, clientId, and or redirectURI not set'
    )
  }
  const authCodeDocument = new AuthorizationCodeModel({
    clientId: clientId,
    redirectURI: redirectURI,
    username: username,
    code: uuid(),
  })
  authCodeDocument.save().then((doc) => {
    const response: AuthorizationResponse<string> = {
      success: true,
      message: 'Authorization Code Granted',
      data: doc.code,
    }
    res.json(response)
  })
}
