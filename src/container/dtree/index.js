import React, { Component } from 'react'
import { Tree, TreeNode } from './component/Tree'

class Page extends Component {

  constructor(props, context) {
    super(props, context)
  }

  async fetchNodeData(item) {
    if (!item) {
      return [
        {
          title: '0-0'
        },
        {
          title: '0-1'
        }
      ]
    }

    return [0, 1].map(i => {
      return {
        title: item.title + '-' + i
      }
    })
  }

  getTree() {
    return (
      <Tree
        fetchNodeData={this.fetchNodeData.bind(this)}
        getNodeStyle={(node, level) => {
          return {
            paddingLeft: (level - 1) * 12
          }
        }}
        checkable
        isDir={item => true}
      />
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
