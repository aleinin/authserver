import { RequestHandler } from 'express'
import {
  AuthorizationCode,
  AuthorizationCodeModel,
} from '../models/schemas/authorization-code'
import { Client, ClientModel } from '../models/schemas/client'
import {
  convertToTokenRequest,
  TokenRequest,
  TokenRequestHTTP,
} from '../models/token-request'
import { User, UserModel } from '../models/schemas/user'
import { BadRequest, Forbidden } from '../responses'

export const validateAuthCode: RequestHandler = (req, res, next) => {
  const request = convertToTokenRequest(req.query as TokenRequestHTTP)
  if (request == null || request.grantType !== 'code') {
    return BadRequest(res)
  }
  AuthorizationCodeModel.findOne(
    { code: request.code },
    async (err: Error, authCode: AuthorizationCode) => {
      if (err || !authCode) {
        console.log(authCode) // todo)
        return
      }
      const client = await getClientSecret(request.clientId)
      const user = await getUser(authCode.username)
      if (client == null) {
        return Forbidden(res, 'Unknown client')
      }
      if (user == null) {
        return Forbidden(res, 'Unknown user')
      }
      if (requestAndCodeMatch(request, client.secret, authCode)) {
        res.locals.user = user
        return next()
      } else {
        return Forbidden(res)
      }
    }
  )
}

const getClientSecret = (clientId: string): Promise<Client | null> =>
  ClientModel.findOne({ id: clientId }).exec()

const getUser = (name: string): Promise<User | null> =>
  UserModel.findOne({ name }).exec()

const requestAndCodeMatch = (
  request: TokenRequest,
  clientSecret: string,
  authCode: AuthorizationCode
): boolean =>
  request.clientId === authCode.clientId &&
  request.clientSecret === clientSecret &&
  request.code === authCode.code &&
  request.redirectURI === authCode.redirectURI
