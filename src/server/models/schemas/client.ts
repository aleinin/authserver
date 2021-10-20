import { model, Schema } from 'mongoose'

export interface Client {
  id: string
  redirectURIs: string[]
  secret: string
}

const schema = new Schema<Client>({
  id: { type: String, required: true },
  redirectURIs: [{ type: String }],
  secret: { type: String, required: true },
})

export const ClientModel = model<Client>('Client', schema)
