import React, { Component } from 'react'
import raf from 'raf'

/**
 * 父children必须传入ref帮助计算宽度或高度
 */
class Marquee extends Component {
  constructor(props, context) {
    super(props, context)

    this.scrollTimer = null
    this.scrollerRef = React.createRef()

    this.isMouseEnter = false
    this.onMouseEnter = this.onMouseEnter.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)

    if (props.direction === 'vertical') {
      this.computeProp = 'height'
      this.scrollProp = 'scrollTop'
      this.offsetProp = 'offsetHeight'
    } else {
      this.computeProp = 'width'
      this.scrollProp = 'scrollLeft'
      this.offsetProp = 'offsetWidth'
    }

    this.state = {
      childrenSize: 0
    }
  }

  componentDidMount() {
    this.getChildrenSize()
    this.initScroll()
  }

  componentWillUnmount() {
    raf.cancel(this.scrollTimer)
  }

  /**
   * 获取children的宽度或高度
   * 文字直接计算，否则由传入的ref计算得出
   */
  getChildrenSize() {
    let size = 0

    React.Children.map(this.props.children, child => {
      if (typeof child === 'string') {
        size += getTextSize(this.scrollerRef.current, child)[this.computeProp]
      } else {
        const ref = child.ref && child.ref.current
        if (ref) {
          size += ref[this.offsetProp]
        }
      }
    })

    this.setState({
      childrenSize: size
    })
  }

  initScroll() {
    const $scroller = this.scrollerRef.current

    let counter = 0
    let speed = this.props.speed || 3

    // tick不断执行，只是数量不够时不进行轮播
    // 通过counter控制动画速度
    // 鼠标经过停止动画
    const tick = () => {
      let shouldScroll = this.shouldScroll()
      let prop = this.scrollProp

      if (!this.isMouseEnter && shouldScroll) {
        counter = (counter + 1) % speed

        if (counter === 0) {
          $scroller[prop] += 1
          if ($scroller[prop] >= this.state.childrenSize) {
            $scroller[prop] = 0
          }
        }
      }

      if (!shouldScroll) {
        $scroller[prop] = 0
      }

      this.scrollTimer = raf(tick)
    }

    this.scrollTimer = raf(tick)
  }

  onMouseEnter() {
    this.isMouseEnter = true
  }

  onMouseLeave() {
    this.isMouseEnter = false
  }

  shouldScroll() {
    const { childrenSize } = this.state
    const $scroller = this.scrollerRef && this.scrollerRef.current

    if (!childrenSize || !$scroller) {
      return false
    }

    const size = $scroller[this.offsetProp]
    if (childrenSize <= size) {
      return false
    }

    return true
  }

  render() {
    const { children } = this.props
    const { childrenSize } = this.state

    return (
      <div
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={this.scrollerRef}
      >
        {
          this.shouldScroll() ? (
            <div style={{ [this.computeProp]: childrenSize * 2 }}>
              { children }
              { children }
            </div>
          ) : children
        }
      </div>
    )
  }
}

export default Marquee

/**
 * 计算文字的宽度和高度
 */
function getTextSize(parent, text) {
  const el = document.createElement('div')
  const ret = {}

  el.style.cssText += ';position: absolute; left: -9999px; top: -9999px'
  el.innerHTML = text

  parent.appendChild(el)
  ret.width = el.offsetWidth
  ret.height = el.offsetHeight
  parent.removeChild(el)

  return ret
}
