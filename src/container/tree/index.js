import React, { Component } from 'react'
import { Tree, TreeNode } from './component/Tree'

class Page extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      list: [
        {
          title: '0-0',
          children: [
            {
              title: '0-0-0',
              children: [
                {
                  title: '0-0-0-0'
                },
                {
                  title: '0-0-0-1'
                }
              ]
            },
            {
              title: '0-0-1',
              children: [
                {
                  title: '0-0-1-0'
                },
                {
                  title: '0-0-1-1'
                }
              ]
            }
          ]
        },
        {
          title: '0-1',
          children: [
            {
              title: '0-1-0',
              children: [
                {
                  title: '0-1-0-0'
                },
                {
                  title: '0-1-0-1'
                }
              ]
            },
            {
              title: '0-1-1',
              children: [
                {
                  title: '0-1-1-0'
                },
                {
                  title: '0-1-1-1'
                }
              ]
            }
          ]
        },
      ]
    }
  }

  getTree() {
    const loop = data => data.map(item => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.title} title={item.title}>{loop(item.children)}</TreeNode>
      }

      return <TreeNode key={item.title} title={item.title} />
    })

    return (
      <Tree>
        { loop(this.state.list) }
      </Tree>
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
