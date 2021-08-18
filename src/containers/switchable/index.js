import React, { Component, Fragment } from 'react'
import Marquee from './Marquee'

class Page extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      data: new Array(25).fill(undefined).map((item, index) => '业务' + (index + 1))
    }
  }

  render() {
    return (
      <Fragment>
        <div style={{ height: 420 }}>
          <Marquee direction="vertical">
            <ul ref={React.createRef()} style={{ margin: 0, padding: 0 }}>
            {
              this.state.data.map(item => {
                return <li key={item}>{ item }</li>
              })
            }
            </ul>
          </Marquee>
        </div>

        <div style={{ width: 500 }}>
          <Marquee>
            <ul ref={React.createRef()} style={{ margin: 0, padding: 0, width: 120 * 25, display: 'inline-block' }}>
            {
              this.state.data.map(item => {
                return <li style={{ display: 'inline-block', width: 120 }} key={item}>{ item }</li>
              })
            }
            </ul>
          </Marquee>
          </div>
      </Fragment>
    )
  }
}

export default Page
