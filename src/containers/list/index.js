import React, { Component } from 'react'
import LongList from './component/List'

class Page extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const data = new Array(10000).fill(undefined).map((item, index) => index + 1)

    this.setState({
      data
    })
  }


  render() {
    return (
      <LongList data={this.state.data} visible={10} itemHeight={50} />
    )
  }
}

export default Page
