import { RequestHandler } from 'express'
import { Error } from 'mongoose'
import { isPopulatedStrings } from '../../util/is-populated-string'
import {
  AuthorizationRequest,
  convertToAuthorizationRequest,
} from '../models/authorization-request'
import { Client, ClientModel } from '../models/schemas/client'
import { BadRequest, Forbidden } from '../responses'

/**
 * POST /authorize/login
 *
 *
 * Used by login client to validate redirect uri information including
 *
 * If successful, moves to next middleware
 *
 * Used by: Login client
 *
 * @param req express request
 * @param res express response
 * @param next express next
 *
 */
export const validateClient: RequestHandler = (req, res, next) => {
  // todo validate scope, state
  const authorizationRequest = convertToAuthorizationRequest(req.body)
  if (!isPopulatedRequest(authorizationRequest)) {
    return BadRequest(res)
  }
  if (authorizationRequest.responseType !== 'code') {
    return BadRequest(res, 'Only response_type code is supported')
  }
  ClientModel.findOne(
    { id: authorizationRequest.clientId },
    (err: Error, client: Client) => {
      if (err || !isValidClient(client, authorizationRequest)) {
        return Forbidden(
          res,
          'Unrecognized client_id / redirect_uri combination'
        )
      }
      res.locals.request = authorizationRequest
      next()
    }
  )
}

const isPopulatedRequest = (
  request: Partial<AuthorizationRequest>
): request is AuthorizationRequest =>
  isPopulatedStrings([
    request.clientId,
    request.redirectURI,
    request.responseType,
    request.scope,
    request.state,
  ])

const isValidClient = (
  client: Client | undefined,
  { clientId, redirectURI }: AuthorizationRequest
): boolean =>
  client?.id === clientId &&
  client?.redirectURIs.some((uri) => uri === redirectURI)
