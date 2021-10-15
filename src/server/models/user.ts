import { model, Mongoose, Schema } from 'mongoose'

export interface User {
  name: string
  password: string
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  password: { type: String, required: true },
})

export const UserModel = model<User>('User', schema)
