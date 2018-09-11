import React, { Component } from 'react'

import Drag from './component/Drag'
import styles from './less/styles.less'

class Page extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }

  render() {
    return (
      <div>
        <Drag
          data={this.state.list}
          onDrop={(data, src, target) => {
            this.setState({
              list: data
            })
          }}
          hoverClass={styles['item-hover']}
        >
          {
            this.state.list.map((item, index) => {
              return <div key={item} styleName="item">{ item }</div>
            })
          }
        </Drag>
      </div>
    )
  }
}

export default Page
