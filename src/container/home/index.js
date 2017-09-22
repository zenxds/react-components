import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"

import Count from './component/Count'

class Home extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      value: this.randomValue()
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        value: this.randomValue()
      })
    }, 1000)
  }


  randomValue() {
    return random(100, 10000)
  }

  render() {
    return (
      <div>
        <Count value={this.state.value} />
      </div>
    )
  }
}

function random(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

export default Home
