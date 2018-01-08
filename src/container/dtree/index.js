import React, { Component } from 'react'
import { Tree, TreeNode } from './component/Tree'

class Page extends Component {

  constructor(props, context) {
    super(props, context)
  }

  async loadNode(parentId) {
    if (!parentId) {
      return [
        {
          title: '0-0'
        },
        {
          title: '0-1'
        }
      ]
    }

    return [0, 1].map(item => {
      return {
        title: parentId + '-' + item
      }
    })
  }

  getTree() {
    return (
      <Tree loadNode={this.loadNode.bind(this)} isDir={item => {
        return true
      }} />
    )
  }

  render() {
    return (
      <div>
        { this.getTree() }
      </div>
    )
  }
}

export default Page
