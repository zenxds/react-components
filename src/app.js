import { Component } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import CSSModules from 'react-css-modules'

import './less/antd.less'
import styles from './less/app.less'

import Header from './component/Header'
import Menu from './component/Menu'
import Dynamic from './dynamic'

@CSSModules(styles)
class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-root">
          <Header />
          <div className="app-wrapper">
            <div className="app-menu">
              <Menu />
            </div>
            <div className="app-content">
              <Switch>
                <Dynamic exact path="/" load={require('bundle-loader?lazy!./container/count')} />
                <Dynamic exact path="/drag" load={require('bundle-loader?lazy!./container/drag')} />
                <Dynamic exact path="/tree" load={require('bundle-loader?lazy!./container/tree')} />
                <Dynamic exact path="/dtree" load={require('bundle-loader?lazy!./container/dtree')} />
                <Dynamic exact path="/fields" load={require('bundle-loader?lazy!./container/fields')} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
