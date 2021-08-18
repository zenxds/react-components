import { Component, cloneElement, isValidElement } from 'react'

export default class Drag extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      start: null,
      current: null,
      end: null
    }
  }

  onDragStart(index) {
    this.setState({
      start: index,
      current: index,
      end: null
    })
  }

  onDragEnter(index) {
    this.setState({
      current: index
    })
  }

  onDragEnd(index) {
    this.setState({
      start: null,
      current: null,
      end: index
    })
  }

  onDragOver(index, event) {
    event.preventDefault()
  }

  onDrop(index) {
    const { start } = this.state
    if (start === index) {
      return
    }

    const data = [].concat(this.props.data);

    [data[start], data[index]] = [data[index], data[start]]


    if (typeof this.props.onDrop === 'function') {
      this.props.onDrop(data, start, index)
    }
  }

  render() {
    const { children, hoverClass } = this.props
    const { start, current, end } = this.state

    return (
      <div className="drag-list">
        {
          children.map((item, index) => {
            const classNames = [ item.props.className ]
            if ((index === start || index === current || index === end) && hoverClass) {
              classNames.push(hoverClass)
            }

            if (isValidElement(item)) {
              return cloneElement(item, {
                draggable: "true",
                onDragStart: this.onDragStart.bind(this, index),
                onDragEnter: this.onDragEnter.bind(this, index),
                onDragEnd: this.onDragEnd.bind(this, index),
                onDragOver: this.onDragOver.bind(this, index),
                onDrop: this.onDrop.bind(this, index),
                className: classNames.join(' ')
              })
            }

            return item
          })
        }
      </div>
    )
  }
}
