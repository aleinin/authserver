import { isPopulatedStrings } from '../../util/is-populated-string'

export interface TokenRequest {
  code: string
  grantType: string
  redirectURI: string
  clientId: string
  clientSecret: string
  codeVerifier: string
}

export interface TokenRequestHTTP {
  code?: string
  grant_type?: string
  redirect_uri?: string
  client_id?: string
  client_secret?: string
  code_verifier?: string
}

export const convertToTokenRequest = (
  query?: TokenRequestHTTP
): TokenRequest | null =>
  isPopulatedRequest({
    code: query?.code,
    grantType: query?.grant_type,
    redirectURI: query?.redirect_uri,
    clientId: query?.client_id,
    clientSecret: query?.client_secret,
    codeVerifier: query?.code_verifier,
  })

const isPopulatedRequest = (
  request: Partial<TokenRequest>
): TokenRequest | null => {
  return isPopulatedStrings([
    request.code,
    request.grantType,
    request.redirectURI,
    request.clientId,
    request.clientSecret,
    request.codeVerifier,
  ])
    ? (request as TokenRequest)
    : null
}
