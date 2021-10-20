import { model, ObjectId, Schema } from 'mongoose'

export interface User {
  _id: ObjectId
  name: string
  fullName: string
  password: string
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  fullName: String,
  password: { type: String, required: true },
})

export const UserModel = model<User>('User', schema)
