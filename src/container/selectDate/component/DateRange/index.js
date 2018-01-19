import React, { Component } from 'react'
import {
  Radio,
  DatePicker
} from 'antd'
import moment from 'moment'
import CSSModules from 'react-css-modules'

import styles from './less/styles.less'

@CSSModules(styles)
class DateRange extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      dateType: '1',
      startTime: moment(),
      endTime: moment()
    }
  }

  onDateTypeChange(e) {
    const startTime = moment().subtract(parseInt(e.target.value) - 1, 'days')
    const endTime = moment()

    this.setState({
      dateType: e.target.value,
      startTime,
      endTime
    }, () => {
      this.props.onChange && this.props.onChange(startTime, endTime)
    })
  }

  onDateChange(date, dateString) {
    this.setState({
      startTime: date[0],
      endTime: date[1],
      dateType: null
    }, () => {
      this.props.onChange && this.props.onChange(date[0], date[1])
    })
  }

  render() {
    const { dateType, startTime, endTime } = this.state

    return (
      <div styleName="typical-daterange">
        <Radio.Group value={dateType} onChange={this.onDateTypeChange.bind(this)}>
          <Radio.Button value="1">今天</Radio.Button>
          <Radio.Button value="7">近7天</Radio.Button>
          <Radio.Button value="15">近15天</Radio.Button>
          <Radio.Button value="30">近30天</Radio.Button>
        </Radio.Group>
        <DatePicker.RangePicker value={[startTime, endTime]} onChange={this.onDateChange.bind(this)} allowClear={false} />
      </div>
    )
  }
}

export default DateRange
