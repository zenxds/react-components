import BaseActions from '@components/BaseActions'

import * as constants from '../constants'
import paths from '@constants/paths'
import store from '../store'

class Actions extends BaseActions {
  getMenus = async () => {
    const menus = await this.get(constants.MENU_INFO)
    if (menus) {
      this.merge({
        menus: addInfo(menus),
      })
    }
  }
}

// 为menu增加code和path
function addInfo(arr = [], lv = 1) {
  return arr.map(item => {
    item.level = lv

    if (paths[item.code]) {
      item.path = paths[item.code]
    }

    if (item.children && item.children.length) {
      item.children = addInfo(item.children, lv + 1)
    }

    return item
  })
}

export default new Actions(store)
