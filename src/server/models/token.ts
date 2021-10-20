// https://datatracker.ietf.org/doc/html/rfc7519#section-10.1.1
export interface Token {
  iss: string
  sub: string
  aud: string[]
  exp: number
  jti: string
  context: Context
}

export interface Context {
  user: {
    name: string
    fullName: string
  }
  apps: App[]
}

export interface App {
  id: string
  name: string
  roles: string[]
}
