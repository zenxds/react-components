import { action } from 'mobx'
import request from '../../../util/request'
import store from '../store'

class Actions {
  constructor(store) {
    this.store = store
  }

  getMsg = () => {
    request('/home').then(data => {
      this.merge({
        msg: data.helloMsg
      })
    })
  }

  @action
  merge = (obj={}) => {
    Object.assign(this.store, obj)
  }
}

export default new Actions(store)
