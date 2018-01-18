import React, { Component } from 'react'

import SelectFields from './component/SelectFields'
import fields from './fields.json'

class Page extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      v1: ['age', 'cp'],
      v2: 'age'
    }
  }

  onChange(key, v) {
    this.setState({
      [key]: v
    })
  }

  render() {
    return (
      <div>
        <SelectFields multiple={true} options={fields} onChange={this.onChange.bind(this, 'v1')} value={this.state.v1} />

        <SelectFields multiple={false} options={fields} onChange={this.onChange.bind(this, 'v2')} value={this.state.v2} />
      </div>
    )
  }
}

export default Page
