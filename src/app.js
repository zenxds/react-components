import { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { Spin } from '@dx/xbee'

import { getHashPath } from '@utils'
import paths from '@constants/paths'
import Login from './containers/user/Login'
import Logout from './containers/user/Logout'
import Main from './containers/main'

import './less/theme.less'
import '@dx/xpanda/xpanda.less'
import './less/app.less'

@inject('userStore', 'userActions')
@observer
class App extends Component {
  shouldGetUserInfo() {
    const path = getHashPath()

    if (path === paths.login || path === paths.logout) {
      return false
    }

    return true
  }

  componentDidMount() {
    if (this.shouldGetUserInfo()) {
      this.props.userActions.getUserInfo()
    }
  }

  renderLoading() {
    return (
      <div style={{ padding: 50, textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }

  render() {
    const { isLogin } = this.props.userStore

    if (this.shouldGetUserInfo() && isLogin === undefined) {
      return this.renderLoading()
    }

    return (
      <Router>
        <Switch>
          <Route path={paths.login} render={props => <Login {...props} />} />
          <Route path={paths.logout} render={props => <Logout {...props} />} />
          <Route
            path="/"
            render={props =>
              isLogin ? <Main {...props} /> : <Redirect to={paths.login} />
            }
          />
        </Switch>
      </Router>
    )
  }
}

export default App
