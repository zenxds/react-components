import * as d3 from 'd3'

import Node from './Node'

/**
 * 模型实验预览组件，简化于完整功能的模型实验可视化组件
 */
class Editor {
  constructor({ $container, width, height, nodeSize, canvas }) {
    this.$container = $container
    this.width = width
    this.height = height
    this.canvas = canvas
    this.nodeSize = nodeSize
    this.nodes = {}
    this.lineColor = '#999'
    this.initElements()
  }

  // 清除编辑器
  destroy() {
    this.$container.select('.editor-nodes').html('')
    this.$container.select('.editor-lines').html('')
  }

  initElements() {
    const { width, height, canvas } = this

    this.$nodes = canvas.main.append('div').classed('editor-nodes', true)

    const $svg = (this.$svg = canvas.svg
      .append('svg')
      .attr('xmlns', d3.namespaces.svg)
      .attr('xmlns:xlink', d3.namespaces.xlink)
      .attr('width', width)
      .attr('height', height)
      .classed('editor-svg', true))

    $svg
      .append('defs')
      .append('marker')
      .attr('id', 'line-triangle')
      .attr('markerWidth', 5)
      .attr('markerHeight', 10)
      .attr('markerUnits', 'userSpaceOnUse')
      .attr('refX', 5)
      .attr('refY', 5)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 5 5 0 10 Z')
      .style('fill', this.lineColor)

    this.$viewport = $svg.append('g').classed('editor-viewport', true)
    this.$lines = this.$viewport.append('g').classed('editor-lines', true)
  }

  addNode(data, cfg = {}) {
    const { width, height } = this.nodeSize
    const node = new Node(
      {
        editor: this,
        width: data.width || width,
        height: data.height || height,
        id: data.id,
        name: data.name,
        x: data.x,
        y: data.y,
      },
      cfg,
    )

    this.nodes[node.id] = node
    return node
  }

  getNodeById(id) {
    return this.nodes[id]
  }
}

export default Editor
