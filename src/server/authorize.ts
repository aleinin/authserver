import { RequestHandler } from 'express'

/**
 * GET /authorize
 *
 *
 * Used by resource owners to get authorization to access protected sources
 *
 * Owner logs in and consents, returned back to the client with an access code
 *
 * Used by: Resource owners (who are sent here by clients)
 *
 * @param req express request
 * @param res express response
 *
 *
 */
export const authorize: RequestHandler = (req, res) => {}
