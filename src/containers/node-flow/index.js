import { Component } from 'react'

import PolicyFlow from './component/PolicyFlow'
import data from './data.json'

class Page extends Component {
  render() {
    return (
      <div>
        <PolicyFlow detail={data.data} />
      </div>
    )
  }
}

export default Page
