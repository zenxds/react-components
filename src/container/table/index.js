import React, { Component } from 'react'

import { get } from '../../util/request'
import DataTable from './component/DataTable'

import styles from './less/styles.less'

class Page extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    get('/table')
    .then(data => {
      this.setState({
        data
      })
    })
  }


  render() {
    const { data } = this.state
    if (!data) {
      return null
    }

    const headFields = data.schema.fields || []
    const dataSource = data.data || []

    const columns = headFields.map((item, index) => {
      const ret =  {
        title: item.name,
        dataIndex: item.name,
        render: (text, record) => {
          return JSON.stringify(text)
        }
      }

      if (!/(array|object)/i.test(item.type)) {
        ret.sorter = (a, b) => {
          if (a[item.name] == b[item.name]) {
            return 0
          }

          return a[item.name] > b[item.name] ? 1 : -1
        }
      }

      return ret
    })
    columns.unshift({
      title: '序号',
      dataIndex: 'client-order',
      width: 45,
      render: (text, record, index) => {
        return index + 1
      }
    })

    return (
      <div styleName="container">
        <DataTable
          headerPadding={8}
          dataSource={dataSource}
          columns={columns}
          rowKey={(item, index) => { return index }}
        />
      </div>
    )
  }
}

export default Page
