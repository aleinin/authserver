import { compareSync } from 'bcrypt'
import { RequestHandler } from 'express'
import { Error } from 'mongoose'
import { isPopulatedString } from '../../util/is-populated-string'
import { extractUserCredentials } from '../models/authorization-request'
import { User, UserModel } from '../models/schemas/user'
import { BadRequest, Forbidden } from '../responses'

/**
 * POST /authorize/login
 *
 *
 * Used by login client to validate resource owner credentials
 *
 * If successful, moves to the next middleware (client verification).
 *
 * Used by: Login client
 *
 * @param req express request
 * @param res express response
 * @param next express next
 *
 */
export const login: RequestHandler = (req, res, next) => {
  // todo rememberMe
  const [name, password, rememberMe] = extractUserCredentials(req.body)
  if (!isPopulatedString(name) || !isPopulatedString(password)) {
    return BadRequest(res)
  }
  UserModel.findOne({ name }, (err: Error, user: User) => {
    if (err || !user || !compareSync(password, user.password)) {
      return Forbidden(res, 'Invalid username/password combo')
    }
    res.locals.name = name
    return next()
  })
}
