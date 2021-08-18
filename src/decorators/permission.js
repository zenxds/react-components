import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { DxResult } from '@dx/xpanda'

export default code => {
  if (!code) {
    throw new Error('permission code is required')
  }

  return WrappedComponent => {
    @inject('userStore')
    @observer
    class Permission extends Component {
      render() {
        const { userStore } = this.props
        const codes = Array.isArray(code) ? code : [code]
        const hasPermission = codes.every(code => userStore.hasPermission(code))

        // 没有权限，应当展示无权限页面
        if (!hasPermission) {
          return (
            <div style={{ paddingTop: 100 }}>
              <DxResult.Type4 title="您暂无访问权限" />
            </div>
          )
        }

        return <WrappedComponent {...this.props} />
      }
    }

    return Permission
  }
}
