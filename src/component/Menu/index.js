import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Menu as AntdMenu,
  Icon
} from 'antd'
import {
  Link
} from 'react-router-dom'

// CSSModules 会导致key变化，在这个模块暂时不使用
// import styles from './less/styles.less'

const {
  Item
} = AntdMenu

const menuCfg = [
  {
    title: 'Count',
    link: '/',
    icon: ''
  },

  {
    title: '拖拽',
    link: '/drag',
    icon: ''
  },

  {
    title: 'Tree',
    link: '/tree',
    icon: ''
  },

  {
    title: '动态Tree',
    link: '/dtree',
    icon: ''
  },

  {
    title: '字段选择',
    link: '/fields',
    icon: ''
  },

  {
    title: '日期选择',
    link: '/date',
    icon: ''
  },

  {
    title: 'Table',
    link: '/table',
    icon: ''
  },

  {
    title: '长列表',
    link: '/list',
    icon: ''
  }
]

class Menu extends Component {
  handleClick(e) {
    const router = this.context.router
    const pathname = router.route.location.pathname
    const target = e.item.props.pathname

    if (pathname !== target) {
      router.history.push(target)
    }
  }

  render() {
    const router = this.context.router
    const pathname = router.route.location.pathname
    const currentMenu = menuCfg.find(item => item.link === pathname) || menuCfg[0]

    return (
      <div>
        <AntdMenu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={currentMenu ? [currentMenu.title] : []}
          onClick={this.handleClick.bind(this)}
        >
          {
            menuCfg.map(item => {
              return (
                <Item key={item.title} pathname={item.link}>
                  { item.icon ? <Icon type={item.icon} /> : null }
                  <span>{item.title}</span>
                </Item>
              )
            })
          }
        </AntdMenu>
      </div>
    )
  }
}

Menu.contextTypes = {
  router: PropTypes.object
}

export default Menu
