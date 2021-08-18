import { Component } from 'react'
import { reaction } from 'mobx'

export default class PageTable extends Component {
  componentDidMount() {
    this.initReaction()
  }

  componentWillUnmount() {
    this.disposer()
  }

  initReaction() {
    const { store } = this.props

    // fetchId变化时重新请求数据
    this.disposer = reaction(
      () => {
        return store.pageFetchId
      },
      () => {
        this.fetchData({
          pageNo: 1,
        })
      },
      {
        fireImmediately: true,
      },
    )
  }

  handlePageChange = async (pageNo, pageSize) => {
    return this.fetchData({ pageNo, pageSize })
  }

  getDataSource() {
    const { items } = this.state
    return items.slice()
  }

  getPagination() {
    const { pageNo, pageSize, itemCount } = this.state

    return {
      size: 'small',
      current: pageNo,
      total: itemCount,
      pageSize: pageSize,
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: this.handlePageChange,
      onShowSizeChange: this.handlePageChange,
    }
  }
}
