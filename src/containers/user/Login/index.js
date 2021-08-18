import React, { createRef } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert, Input, Button, message } from '@dx/xbee'
import lottie from 'lottie-web'

import { COMPANY_NAME } from '@constants'
import './styles.less'

@inject('userActions', 'userStore')
@observer
export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      account: '',
      password: '',

      loginErrorMsg: '',
    }

    this.cartoonRef = createRef()
    this.accountRef = createRef()
    this.passwordRef = createRef()
  }

  componentDidMount() {
    this.initAnimation()
  }

  initAnimation() {
    this.loginAnimation = lottie.loadAnimation({
      container: this.cartoonRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '/data/json/login.json',
    })

    this.handleVisibilityChange()
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
  }

  componentWillUnmount() {
    if (this.loginAnimation) {
      this.loginAnimation.destroy()
    }

    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
    )
  }

  handleVisibilityChange = () => {
    // 用户离开了当前页面
    if (document.visibilityState === 'hidden') {
      this.loginAnimation.stop()
    }

    // 用户打开或回到页面
    if (document.visibilityState === 'visible') {
      this.loginAnimation.play()
    }
  }

  handleChange(type, e) {
    this.setState({
      [type]: e.target.value,
      loginErrorMsg: '',
    })
  }

  handleKeyUp = e => {
    // 回车
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin = async () => {
    const { password, account } = this.state

    if (!account) {
      message.error('用户名不能为空')
      return
    }

    if (!password) {
      message.error('密码不能为空')
      return
    }

    this.setState({
      loading: true,
    })

    try {
      await this.props.userActions.login({
        account,
        password,
      })

      this.setState({
        loading: false,
        loginErrorMsg: '',
      })
      this.props.userActions.loginSuccess()
    } catch (err) {
      this.setState({
        loginErrorMsg: err.message || '登录失败',
        loading: false,
      })
    }
  }

  render() {
    const { loading, loginErrorMsg } = this.state

    return (
      <div styleName="root" id="login">
        <div styleName="triangle-bg1" />
        <div styleName="triangle-bg2" />
        <div styleName="main-animation">
          <div styleName="login-cartoon" ref={this.cartoonRef} />
        </div>
        <div styleName="logo">
          <a href="/" title={COMPANY_NAME}>
            <img src="/data/images/logo.png" />
          </a>
        </div>
        <div styleName="login-box">
          <div styleName="welcome">WELCOME</div>
          <div styleName="login-title">
            <div styleName="title-en">Sign in</div>
            <div styleName="title-ch">登录</div>
          </div>
          <div styleName="error-tip-msg">
            {loginErrorMsg ? (
              <div styleName="error-tip-msg-content">
                <Alert message={loginErrorMsg} type="error" />
              </div>
            ) : null}
          </div>
          <div id="form" styleName="login-form">
            <div styleName="input">
              <div styleName="input-legend">用户名</div>
              <Input
                size="large"
                onChange={this.handleChange.bind(this, 'account')}
                ref={this.accountRef}
                placeholder="请输入用户名"
              />
            </div>
            <div styleName="input">
              <div styleName="input-legend">密码</div>
              <input
                type="password"
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange.bind(this, 'password')}
                ref={this.passwordRef}
                placeholder="请输入密码"
              />
            </div>
            <Button
              loading={loading}
              type="primary"
              size="large"
              onClick={this.handleLogin}
            >
              登录
            </Button>
          </div>
        </div>
      </div>
    )
  }
}
