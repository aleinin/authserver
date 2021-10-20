import { Response } from 'express'
import {
  AuthorizationResponse,
  createAuthResponse,
} from './models/authorization-response'

export const BadRequest = (res: Response, message = 'Bad Request') =>
  genericResponse(res, 400, createAuthResponse(false, message))

export const Unauthorized = (res: Response, message = 'Unauthorized') =>
  genericResponse(res, 401, createAuthResponse(false, message))

export const Forbidden = (res: Response, message = 'Forbidden') =>
  genericResponse(res, 403, createAuthResponse(false, message))

export const InternalServerError = (
  res: Response,
  message = 'Internal Server Error'
) => genericResponse(res, 500, createAuthResponse(false, message))

const genericResponse = (
  res: Response,
  status: number,
  payload: AuthorizationResponse<never>
) => {
  res.status(status)
  res.json(payload)
}
