import { Component } from 'react'
import {
  // inject,
  observer,
} from 'mobx-react'
import {
  // BrowserRouter as Router
  // HashRouter as Router,
  Switch,
  Route,
  // Redirect,
  withRouter,
} from 'react-router-dom'
import { Result } from '@dx/xbee'

import paths from '@constants/paths'
import Header from '@components/Header'
import Menu from '@components/Menu'
import Dynamic from './dynamic'

@withRouter
@observer
export default class Main extends Component {
  render() {
    return (
      <div className="app-root">
        <div className="app-header">
          <Header />
        </div>
        <div className="app-wrapper">
          <div className="app-menu">
            <Menu />
          </div>
          <div className="app-content">
            <Switch>
              <Dynamic
                exact
                path="/"
                bundle={require('bundle-loader?lazy!./home')}
              />
              {/*
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to={paths.index} />}
                />
              */}
              <Dynamic
                exact
                path={paths.nodeFlow}
                bundle={require('bundle-loader?lazy!./node-flow')}
              />
              <Dynamic
                exact
                path={paths.drag}
                bundle={require('bundle-loader?lazy!./drag')}
              />
              <Dynamic
                exact
                path={paths.switchable}
                bundle={require('bundle-loader?lazy!./switchable')}
              />
              <Dynamic
                exact
                path={paths.tree}
                bundle={require('bundle-loader?lazy!./tree')}
              />
              <Dynamic
                exact
                path={paths.dtree}
                bundle={require('bundle-loader?lazy!./dtree')}
              />
              <Dynamic
                exact
                path={paths.count}
                bundle={require('bundle-loader?lazy!./count')}
              />
              <Dynamic
                exact
                path={paths.list}
                bundle={require('bundle-loader?lazy!./list')}
              />
              <Dynamic
                exact
                path={paths.fields}
                bundle={require('bundle-loader?lazy!./fields')}
              />
              <Route path="/" render={() => <Result status="404" />} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
