import { Component } from 'react'

export class Tree extends Component {
  render() {
    return (
      <ul>
        { this.props.children }
      </ul>
    )
  }
}

export class TreeNode extends Component {
  render() {
    const { children } = this.props
    const hasChildren = children && children.length

    return (
      <li>
        { this.props.title }
        { hasChildren ? <ul>{ this.props.children }</ul> : null }
      </li>
    )
  }
}
