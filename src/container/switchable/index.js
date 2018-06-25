import React, { Component } from 'react'
import Switchable from './Switchable'

class Page extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      data: new Array(25).fill(undefined).map((item, index) => '业务' + (index + 1))
    }
  }

  render() {
    return (
      <Switchable visible={20} itemHeight={21}>
        {
          this.state.data.map(item => {
            return <li key={item}>{ item }</li>
          })
        }
      </Switchable>
    )
  }
}

export default Page
