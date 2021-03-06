import React, { Component } from 'react'
import { Icon } from 'antd'

import styles from './less/styles.less'

const scrollbarWidth = getScrollbarWidth()

class DataTable extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      sortColumn: '',
      sortType: '',
      tableStyle: {}
    }
    this.minColWidth = 15
    this.colWidth = {}
  }

  /**
   * 调整th的宽度
   */
  onResizerMouseDown(dataIndex, event) {
    event.preventDefault()

    let mouseX = event.pageX
    let resizer = this.$headerResizer
    resizer.classList.add(styles['resizer-hover'])

    // 定位resizer
    const pin = event => {
      const left = event.pageX - this.$header.getBoundingClientRect().left
      resizer.style.left = (left + this.$header.scrollLeft) + 'px'
    }

    const move = event => {
      let w = this.colWidth[dataIndex]
      if (typeof w !== 'number') {
        return
      }

      let newWidth = w + (event.pageX - mouseX)
      if (newWidth < this.minColWidth) {
        newWidth = this.minColWidth
      }

      pin(event)
      mouseX = event.pageX
      this.colWidth[dataIndex] = newWidth
    }
    const up = () => {
      document.removeEventListener('mousemove', move, false)
      document.removeEventListener('mouseup', up, false)

      resizer.classList.remove(styles['resizer-hover'])
      this.forceUpdate()
    }

    pin(event)
    document.addEventListener('mousemove', move, false)
    document.addEventListener('mouseup', up, false)
  }

  onHeaderScroll() {

  }

  onBodyScroll(event) {
    const left = event.target.scrollLeft

    this.$header.scrollLeft = left
  }

  // 为了处理windows下滚动条引起的错位
  initWidth() {
    if (!this.$header || !this.$body || this.tableStyleInited) {
      return
    }

    this.tableStyleInited = true
    this.setState({
      tableStyle: {
        width: this.$header.offsetWidth,
        // 原本没有横向滚动条，就设置了宽度之后hidden
        overflowX: this.$body.scrollWidth > this.$body.clientWidth ? '' : 'hidden'
      }
    })
  }

  toggleSort(type, column) {
    const { sortColumn, sortType } = this.state

    if (sortColumn === column && sortType === type) {
      this.setState({
        sortColumn: '',
        sortType: ''
      })
    } else {
      this.setState({
        sortColumn: column,
        sortType: type
      })
    }
  }

  render() {
    const { columns, dataSource, rowKey, headerPadding } = this.props
    let data = dataSource.slice()

    columns.forEach((item, index) => {
      if (this.colWidth[item.dataIndex]) {
        item.width = this.colWidth[item.dataIndex]
      } else if (!item.width) {
        item.width = index === columns.length - 1 ? 'auto' : getTextWidth(item.title) + (headerPadding || 5) * 2 + (item.sorter ? 20 : 0)
      }

      this.colWidth[item.dataIndex] = item.width

      if (item.dataIndex === this.state.sortColumn) {
        data.sort(item.sorter)

        if (this.state.sortType === 'descend') {
          data.reverse()
        }
      }
    })

    return (
      <div styleName="table">
        <div styleName="table-header" ref={elem => {
          this.$header = elem
          this.initWidth()
        }} onScroll={this.onHeaderScroll.bind(this)}>
          <table style={{ width: this.state.tableStyle.width }}>
            <colgroup>
              {
                columns.map(item => {
                  return <col key={item.dataIndex} data-col={item.dataIndex} style={{ width: item.width }} />
                })
              }
              <col style={{ width: scrollbarWidth }} />
            </colgroup>
            <thead>
              <tr>
                {
                  columns.map(item => {
                    const isSortColumn = item.dataIndex === this.state.sortColumn
                    return <th key={item.dataIndex} title={item.title}>
                      { item.title }
                      { item.sorter ? (
                        <div styleName="sorter">
                          <span
                            styleName={`sorter-up ${isSortColumn && this.state.sortType === 'ascend' ? 'on' : ''}`}
                            title="↑"
                            onClick={() => this.toggleSort('ascend', item.dataIndex)}
                          >
                            <Icon type="caret-up" />
                          </span>
                          <span
                            styleName={`sorter-down ${isSortColumn && this.state.sortType === 'descend' ? 'on' : ''}`}
                            title="↓"
                            onClick={() => this.toggleSort('descend', item.dataIndex)}
                          >
                            <Icon type="caret-down" />
                          </span>
                        </div>
                      ) : null}
                      <div styleName="resizer" onMouseDown={this.onResizerMouseDown.bind(this, item.dataIndex)} />
                    </th>
                  })
                }
                <th />
              </tr>
            </thead>
          </table>
          <div styleName="header-resizer" ref={elem => {
            this.$headerResizer = elem
          }} />
        </div>

        <div styleName="table-body" className="ui-table-body" ref={elem => {
          this.$body = elem
          this.initWidth()
        }} onScroll={this.onBodyScroll.bind(this)} style={{
          overflowX: this.state.tableStyle.overflowX
        }}>
          <table style={{ width: this.state.tableStyle.width }}>
            <colgroup>
              {
                columns.map(item => {
                  return <col key={item.dataIndex} data-col={item.dataIndex} style={{ width: item.width }} />
                })
              }
            </colgroup>
            <tbody>
              {
                data.map((data, index) => {
                  return (
                    <tr key={rowKey(data, index)}>
                    {
                      columns.map(item => {
                        const text = item.render(data[item.dataIndex], data, index)
                        return <td key={item.dataIndex} data-col={item.dataIndex} title={ text }>{ text }</td>
                      })
                    }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default DataTable

function getTextWidth(text) {
  const el = document.createElement('div')
  el.style.cssText += ';position: absolute; left: -9999px; top: -9999px'
  el.innerHTML = text

  document.body.appendChild(el)
  const width = el.offsetWidth
  document.body.removeChild(el)

  return width
}

function getScrollbarWidth() {
  const outer = document.createElement("div")
  outer.style.cssText += ";postion: absolute; left: -9999px; top: -9999px; visibility: hidden; width: 100px"

  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth

  outer.style.overflow = "scroll"
  // add innerdiv
  const inner = document.createElement("div")
  inner.style.cssText += ";width: 100%;"
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  // remove divs
  outer.parentNode.removeChild(outer)

  return widthNoScroll - widthWithScroll
}
