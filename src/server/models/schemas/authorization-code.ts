import { model, Schema } from 'mongoose'

export interface AuthorizationCode {
  clientId: string
  redirectURI: string
  username: string
  code: string
  createdAt: Date
}

const schema = new Schema<AuthorizationCode>({
  clientId: String,
  redirectURI: String,
  username: String,
  code: String,
  createdAt: { type: Date, expires: 60, default: Date.now as unknown as Date },
})

export const AuthorizationCodeModel = model<AuthorizationCode>(
  'authorization_code',
  schema
)
