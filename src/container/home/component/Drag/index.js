import { Component, cloneElement, isValidElement } from 'react'

export default class Drag extends Component {
  constructor(props, context) {
    super(props, context)

    this.currentIndex = -1
  }

  onDragStart(index) {
    this.currentIndex = index
  }

  onDragEnter(index) {
    this.onChange(this.currentIndex, index)
    this.currentIndex = index
  }

  onDragEnd() {
    this.currentIndex = -1
  }

  onChange(src, target) {
    if (src === target) {
      return
    }

    const data = [].concat(this.props.data);

    [data[src], data[target]] = [data[target], data[src]]

    if (typeof this.props.onChange === 'function') {
      return this.props.onChange(data, src, target)
    }
  }

  render() {
    const children = this.props.children

    return (
      <div className="drag-list">
        {
          children.map((item, index) => {
            if (isValidElement(item)) {
              return cloneElement(item, {
                draggable: "true",
                onDragStart: this.onDragStart.bind(this, index),
                onDragEnter: this.onDragEnter.bind(this, index),
                onDragEnd: this.onDragEnd.bind(this, index)
              })
            }

            return item
          })
        }
      </div>
    )
  }
}
