import React, { Component } from 'react'
import raf from 'raf'

class Switchable extends Component {
  constructor(props, context) {
    super(props, context)

    this.listRef = React.createRef()
    this.scrollTimer = null
  }

  componentDidMount() {
    this.initScroll()
  }

  initScroll() {
    const $list = this.listRef.current

    let counter = 0

    // tick不断执行，只是数量不够时不进行轮播
    // 通过counter控制动画速度
    const tick = () => {
      const { children, itemHeight, visible } = this.props
      const length = children ? children.length : 0

      if (length > visible) {
        counter = (counter + 1) % 2

        if (counter === 0) {
          $list.scrollTop += 1

          if ($list.scrollTop >= length * itemHeight) {
            $list.scrollTop = 0
          }
        }
      }

      this.scrollTimer = raf(tick)
    }

    this.scrollTimer = raf(tick)
  }

  render() {
    const { visible, itemHeight } = this.props

    return (
      <div className="switchable" style={{ height: `${visible * itemHeight}px`, overflow: 'hidden'}} ref={this.listRef}>
        <ul>
          { this.props.children }
          {
            React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child)
            })
          }
        </ul>
      </div>
    )
  }
}


export default Switchable
