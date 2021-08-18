import React, { Component, createRef } from 'react'
import * as d3 from 'd3'

import Editor from './Editor'
import './less/editor.less'
import './less/node.less'

class PolicyFlow extends Component {
  constructor(props) {
    super(props)

    this.editorRef = createRef()
  }

  async componentDidMount() {
    await this.initEditor()
    this.initData()
  }

  async initEditor() {
    const $container = d3.select(this.editorRef.current)

    this.editor = new Editor({
      width: 2000,
      height: 2000,
      nodeSize: {
        width: 138,
        height: 32,
      },
      canvas: {
        svg: $container.select('.svg-canvas'),
        main: $container.select('.main-canvas'),
        guide: $container.select('.guide-canvas'),
      },
      $container,
    })
  }

  initData() {
    const { detail } = this.props
    const editorNodes = this.editor.nodes
    const ys = [] //全部的y坐标，计算结束节点的y坐标

    const startNodePosition = (detail.coordinate || '').split(',')
    this.startNode = this.editor.addNode(
      {
        id: 'code' + (Math.random().toFixed(10) + '').slice(2),
        width: 24,
        height: 24,
        x: detail.coordinate ? parseInt(startNodePosition[0]) : 250,
        y: detail.coordinate ? parseInt(startNodePosition[1]) : 100,
      },
      {
        type: 'start',
      },
    )

    detail.nodeList.forEach(item => {
      let position = (item.coordinate || '').split(',')
      ys.push(parseInt(position[1]) || 0)

      this.editor.addNode(
        {
          id: item.id,
          name: item.name,
          x: parseInt(position[0]) || 0,
          y: parseInt(position[1]) || 0,
        },
        {
          ...item,
          type: 'node',
        },
      )
    })

    let minX = Math.min(...Object.values(editorNodes).map(item => item.x))
    let minY = Math.min(...Object.values(editorNodes).map(item => item.y))
    let container = this.editorRef.current

    container.scrollLeft = Math.max(
      minX - (container.offsetWidth - this.editor.nodeSize.width) / 2,
      0
    )
    container.scrollTop = Math.max(
      minY - (container.offsetHeight - this.editor.nodeSize.height) / 2,
      0
    )

    let endNodeY = Math.max(...ys) + 150
    this.endNode = this.editor.addNode(
      {
        id: 'code' + (Math.random().toFixed(10) + '').slice(2),
        width: 24,
        height: 24,
        x: 250,
        y: endNodeY,
      },
      {
        type: 'end',
      },
    )

    // 连线
    detail.nodeList.map(item => {
      let node = editorNodes[item.id]
      let subIds = (item.subPolicyId && item.subPolicyId.split(',')) || []

      subIds.map(id => {
        if (id === '-1') {
          id = this.endNode.id
        }

        node.addConnect(id)

        let targetNode = editorNodes[id]
        if (targetNode) {
          targetNode.updateCondition(
            targetNode.cfg.executionConditionDescription,
          )
        }
      })
    })

    // 开始节点的子节点
    const { subPolicyId } = detail
    if (subPolicyId) {
      let startSubNodes = subPolicyId.split(',')
      startSubNodes.map(id => {
        let node = editorNodes[id]

        if (node) {
          this.startNode.addConnect(id)
          node.updateCondition(node.cfg.executionConditionDescription)
        }
      })
    }
  }

  render() {
    return (
      <div style={{ height: 500 }}>
        <div className="policy-flow-editor-container" ref={this.editorRef}>
          <div className="svg-canvas" />
          <div className="main-canvas" />
          <div className="guide-canvas" />
        </div>
      </div>
    )
  }
}

export default PolicyFlow
