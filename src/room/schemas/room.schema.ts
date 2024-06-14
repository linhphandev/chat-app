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
export class Room {
  @Prop({
    type: String,
    default: v4,
  })
  _id: string

  @Prop({ required: true, trim: true })
  name: string

  @Prop({ type: [String], default: [] })
  userIds: string[]

  @Prop({ type: String })
  createdBy?: string

  @Prop({ type: Date, default: Date.now })
  createdAt: Date

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date

  @Prop({ type: Date })
  deletedAt?: Date

  @Prop({ type: Boolean, default: false })
  deleted: boolean
}

export const RoomSchema = SchemaFactory.createForClass(Room)
RoomSchema.index({ name: 1 })
RoomSchema.index({ userIds: 1 })
RoomSchema.index({ createdAt: -1 })
RoomSchema.index({ deleted: 1 })

RoomSchema.plugin(mongoosePaginate)
export type RoomDocument = Room & mongoose.Document
