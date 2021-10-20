export interface AuthorizationRequest {
  clientId: string
  responseType: string
  state: string
  redirectURI: string
  scope: string
}

interface AuthorizationRequestHTTP {
  client_id?: string
  response_type?: string
  state?: string
  redirect_uri?: string
  scope?: string
  username?: string
  password?: string
  remember_me?: boolean
}

export const convertToAuthorizationRequest = (
  body?: AuthorizationRequestHTTP
): Partial<AuthorizationRequest> => ({
  clientId: body?.client_id,
  responseType: body?.response_type,
  state: body?.state,
  redirectURI: body?.redirect_uri,
  scope: body?.scope,
})

type UserCredentials = [
  string | undefined,
  string | undefined,
  boolean | undefined
]
export const extractUserCredentials = (
  body?: AuthorizationRequestHTTP
): UserCredentials => [body?.username, body?.password, body?.remember_me]
