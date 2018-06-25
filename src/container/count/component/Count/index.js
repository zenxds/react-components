import React, { Component } from 'react'
import raf from 'raf'

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2
}

function toNumber(val) {
  val = Number(val)

  if (isNaN(val)) {
    console.warn('Count value is NaN')
  }

  return val || 0
}

/**
 * 数字传入新值时进行滚动
 */
class Count extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      value: toNumber(props.value)
    }
  }

  animate(start, end) {
    const duration = this.props.duration || 500
    const startTime = new Date()

    const tick = () => {
      let percent = (new Date() - startTime) / duration

      if (percent >= 1) {
        this.timer = null
        this.setState({
          value: end
        })
      } else {
        this.setState({
          value: Math.ceil(start + (end - start) * cubicInOut(percent))
        })

        this.timer = raf(tick)
      }
    }

    this.timer = raf(tick)
  }

  componentDidUpdate(prevProps, prevState) {
    const oldValue = toNumber(prevProps.value)
    const newValue = toNumber(this.props.value)

    if (newValue !== oldValue) {
      if (this.timer) {
        raf.cancel(this.timer)
      }

      // 从当前数字开始计算
      this.animate(this.state.value, newValue)
    }
  }

  render() {
    return (
      <span>{ this.state.value }</span>
    )
  }
}

export default Count
