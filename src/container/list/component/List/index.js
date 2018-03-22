import React, { Component } from 'react'
import CSSModules from 'react-css-modules'

import styles from './less/styles.less'

@CSSModules(styles)
class LongList extends Component {
  constructor(props, ctx) {
    super(props, ctx)

    // 当前的索引
    this.state = {
      index: 0
    }
  }

  onScroll() {
    const { data, visible = 10 } = this.props
    const { index } = this.state
    const lastItem = this.$container.querySelector(`.${styles.item}:last-child`)
    const firstItem = this.$container.querySelector(`.${styles.item}:first-child`)
    const maxIndex = Math.ceil(data.length / visible) - 1

    // 向下时最后一个元素的顶部出现在视口
    let rect = lastItem.getBoundingClientRect()
    if (rect.top - this.top <= this.height && index < maxIndex) {
      this.setState({
        index: this.state.index + 1
      })
    }

    // 向上时第一个元素的底部出现在视口
    rect = firstItem.getBoundingClientRect()
    if (rect.bottom - this.top >= 0 && index > 0) {
      this.setState({
        index: index - 1
      })
    }
  }

  initContainer(dom) {
    if (this.$container) {
      return
    }

    let rect = dom.getBoundingClientRect()

    this.$container = dom
    this.height = rect.height
    this.top = rect.top
  }

  render() {
    const { data, visible = 10, itemHeight } = this.props
    const { index } = this.state
    let start = index * visible
    let end = (index + 3) * visible - 1

    if (start < 0) {
      start = 0
    }
    if (end > data.length - 1) {
      end = data.length - 1
    }

    const visibleData = data.slice(start, end)

    return (
      <div styleName="container" onScroll={this.onScroll.bind(this)} ref={dom => {
        this.initContainer(dom)
      }}>
        <div styleName="content" style={{
          paddingTop: index * visible * itemHeight
        }}>
          {
            visibleData.map(item => {
              return <div styleName="item" key={item}>{ item }</div>
            })
          }
        </div>
      </div>
    )
  }
}

export default LongList
