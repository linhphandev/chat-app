import * as _ from 'lodash'

export const TestRoomData = {
  _id: 'test-room-id-1',
  name: 'test-room-name-1',
  userIds: ['test-user-id-1'],
}

export class TestRoomModel {
  constructor(data) {
    Object.assign(this, data)
  }

  save() {
    return this
  }

  static paginate() {
    return {
      docs: [new TestRoomModel(TestRoomData)],
      page: 1,
      total: 1,
      limit: 5,
      pages: 2,
    }
  }

  static find() {
    return [new TestRoomModel(TestRoomData)]
  }

  static findOne(params: { _id?: string; name?: string }) {
    const { _id, name } = params
    if (_id !== undefined && _id !== TestRoomData._id) {
      return null
    }
    if (name !== undefined && name !== TestRoomData.name) {
      return null
    }
    return new TestRoomModel(TestRoomData)
  }

  static findOneAndUpdate(params: { _id: string }, body: any) {
    const doc = body
    const { _id } = params
    if (_id !== TestRoomData._id) {
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
    return _.defaultsDeep(doc, TestRoomData)
  }

  static findByIdAndUpdate(params: { _id: string }, body: any) {
    return this.findOneAndUpdate(params, body)
  }
}
