import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import Drag from './component/Drag'
import styles from './less/styles.less'

@CSSModules(styles)
class Page extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      current: -1,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }

  render() {
    return (
      <div>
        <Drag data={this.state.list} onChange={(data, src, target) => {
          this.setState({
            current: target,
            list: data
          })
        }}>
          {
            this.state.list.map((item, index) => {
              return <div key={item} styleName={this.state.current === index ? 'item-active' : 'item'}>{ item }</div>
            })
          }
        </Drag>
      </div>
    )
  }
}

export default Page
