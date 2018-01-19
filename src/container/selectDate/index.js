import { Component } from 'react'

import DateRange from './component/DateRange'

class Page extends Component {
  render() {
    return (
      <div>
        <DateRange onChange={(start, end) => {
          console.log(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'))
        }} />
      </div>
    )
  }
}

export default Page
