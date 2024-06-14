import * as mongoose from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'
import { v4 } from 'uuid'

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema({
  _id: false,
  timestamps: true,
  toObject: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  },
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id
      delete ret.__v
    },
  },
})
export class Message {
  @Prop({
    type: String,
    default: v4,
  })
  _id: string

  @Prop({ required: true })
  roomId: string

  @Prop({ type: String })
  content: string

  @Prop({ required: true })
  createdBy: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date

  @Prop({ type: Date })
  deletedAt?: Date

  @Prop({ type: [String], default: [] })
  deletedUserIds: string[]

  @Prop({ type: Boolean, default: false })
  deleted: boolean
}

export const MessageSchema = SchemaFactory.createForClass(Message)
MessageSchema.index({ roomId: 1 })
MessageSchema.index({ userId: 1 })
MessageSchema.index({ createdAt: -1 })
MessageSchema.index({ deleted: 1 })
MessageSchema.index({ deletedUserIds: 1 })

MessageSchema.plugin(mongoosePaginate)
export type MessageDocument = Message & mongoose.Document
