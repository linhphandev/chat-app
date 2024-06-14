import * as _ from 'lodash'

export const TestRoomData = {
  id: 'test-room-1',
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
      docs: [],
      page: 1,
      total: 10,
      limit: 5,
      pages: 2,
    }
  }

  static find() {
    return [new TestRoomModel(TestRoomData)]
  }

  static findOne(params: { _id: string }) {
    const { _id } = params
    return new TestRoomModel(TestRoomData)
  }

  static findOneAndUpdate(params: { _id: string }, body: any) {
    const doc = body
    const { _id } = params
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
}
