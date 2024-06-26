import * as _ from 'lodash'

export const TestMessageData = {
  _id: 'test-message-id-1',
  content: 'test-message-name-1',
  roomId: 'test-room-id-1',
  createdBy: 'test-user-id-1',
  deletedUserIds: ['test-user-id-2'],
}

export class TestMessageModel {
  constructor(data) {
    Object.assign(this, data)
  }

  save() {
    return this
  }

  static paginate() {
    return {
      docs: [new TestMessageModel(TestMessageData)],
      page: 1,
      total: 1,
      limit: 5,
      pages: 2,
    }
  }

  static find() {
    return [new TestMessageModel(TestMessageData)]
  }

  static findOne(params: { _id: string }) {
    const { _id } = params
    if (_id !== TestMessageData._id) {
      return null
    }
    return new TestMessageModel(TestMessageData)
  }

  static findOneAndUpdate(params: { _id: string }, body: any) {
    const doc = body
    const { _id } = params
    if (_id !== TestMessageData._id) {
      return null
    }
    if (doc.$set) {
      const keys = Object.keys(doc.$set)
      for (let i = 0; i < keys.length; i += 1) {
        _.set(doc, keys[i], _.get(doc.$set, keys[i]))
      }
      delete doc.$set
    }
    if (doc.$push) {
      const keys = Object.keys(doc.$push)
      for (let i = 0; i < keys.length; i += 1) {
        if (!doc[keys[i]]) {
          doc[keys[i]] = []
        }
        doc[keys[i]].push(doc.$push[keys[i]])
      }
      delete doc.$push
    }
    return _.defaultsDeep(doc, TestMessageData)
  }

  static updateOne(params: { _id: string }, body: any) {
    return this.findOneAndUpdate(params, body)
  }
}
