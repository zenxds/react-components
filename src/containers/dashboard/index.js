import { Component } from 'react'
import { observer, inject } from 'mobx-react'

import * as decorators from '@decorators'
import { Layout } from '@dx/xbee'
import actions from './actions'
import store from './store'

@decorators.errorBoundary
@decorators.provider({
  actions,
  store,
})
@inject('actions', 'store')
@observer
class Dashboard extends Component {
  render() {
    return <Layout.DxMain title="总览" />
  }
}

export default Dashboard
