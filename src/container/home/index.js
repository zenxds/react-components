import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"
import CSSModules from 'react-css-modules'

import Count from './component/Count'
import Drag from './component/Drag'
import styles from './less/styles.less'

@CSSModules(styles)
class Home extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      value: this.randomValue(),
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        value: this.randomValue()
      })
    }, 1000)
  }


  randomValue() {
    return random(100, 10000)
  }

  render() {
    return (
      <div>
        <Count value={this.state.value} />

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

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export default Home
