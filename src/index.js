/**
 * 入口
 */
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'
import { ConfigProvider } from '@dx/xbee'
import zhCN from '@dx/xbee/es/locale/zh_CN'
import moment from 'moment'

import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import { getPopupContainer } from '@utils'
import App from './app'
import injects from './inject'

// 不允许在动作外部修改状态
configure({ enforceActions: 'observed' })

ReactDOM.render(
  <Provider {...injects}>
    <ConfigProvider locale={zhCN} getPopupContainer={getPopupContainer}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById('app'),
)
