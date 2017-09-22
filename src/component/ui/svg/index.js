import React, { Component } from 'react'

class SVG extends Component {
  render() {
    const otherProps = {...this.props}
    delete otherProps.svg

    return (
      <i {...otherProps} dangerouslySetInnerHTML={{__html: this.props.svg}} />
    )
  }
}

export default SVG
