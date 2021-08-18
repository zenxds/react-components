import React from 'react'
import { inject, observer } from 'mobx-react'
import { Progress, message } from '@dx/xbee'

import paths from '@constants/paths'
import './styles.less'

@inject('userActions', 'userStore')
@observer
export default class Logout extends React.Component {
  async doLogout() {
    const r = await this.props.userActions.logout()
    if (r === undefined) {
      message.error('退出登录失败')
      return
    }

    // 正常退出
    location.hash = '#' + paths.logout + '?redirect=1'
    location.reload()
  }

  componentDidMount() {
    // 退出后刷新直接跳转到登陆
    if (/redirect/.test(location.hash)) {
      location.hash = '#' + paths.login
    } else {
      this.doLogout()
    }
  }

  render() {
    return (
      <div styleName="root">
        <Progress
          percent={100}
          strokeWidth={5}
          status="active"
          showInfo={false}
        />
        <div styleName="info">正在退出...</div>
      </div>
    )
  }
}
