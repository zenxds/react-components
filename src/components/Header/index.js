import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Icon, Menu, Dropdown } from '@dx/xbee'

import paths from '@constants/paths'
import './less/styles.less'

@inject('userStore', 'userActions')
@withRouter
@observer
class Header extends Component {
  handleLogout = () => {
    this.props.history.push(paths.logout)
  }

  render() {
    const { userStore } = this.props
    const menu = (
      <Menu>
        <Menu.Item>
          <a onClick={this.handleLogout}>安全退出</a>
        </Menu.Item>
      </Menu>
    )

    return (
      <Fragment>
        <Link to="/" styleName="logo">
          <img src="/data/images/logo.png" />
        </Link>

        <div styleName="header-info">
          <Dropdown overlay={menu} placement="bottomLeft">
            <div styleName="user-info">
              <a styleName="user-name" title={userStore.nickName}>
                {userStore.nickName}
                <Icon type="down" style={{ marginLeft: '3px' }} />
              </a>
            </div>
          </Dropdown>
        </div>
      </Fragment>
    )
  }
}

export default Header
