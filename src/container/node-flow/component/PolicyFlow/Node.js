import * as d3 from 'd3'

const lineWidthNormal = 1
// const lineWidthHover = 6

class Node {
  constructor({ editor, x, y, width, height, id, name }, cfg = {}) {
    this.editor = editor
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.id = id
    this.name = name
    this.cfg = cfg

    this.sourceNode = null
    this.sourceNodes = {}
    this.targetNodes = {}

    this.initElements()
  }

  initElements() {
    if (typeof this.x !== 'number' || typeof this.y !== 'number') {
      return
    }

    const { x, y, id, name } = this
    const { type } = this.cfg

    if (type === 'start') {
      const $node = (this.$node = this.editor.$nodes
        .append('div')
        .classed('editor-node editor-node-start', true)
        .attr('data-id', id)
        .style('left', `${x}px`)
        .style('top', `${y}px`))

      $node.append('div').classed('start-icon', true)
      $node.append('div').classed('editor-node-export', true)
      return
    }

    if (type === 'end') {
      const $node = (this.$node = this.editor.$nodes
        .append('div')
        .classed('editor-node editor-node-end', true)
        .attr('data-id', id)
        .style('left', `${x}px`)
        .style('top', `${y}px`))

      $node.append('div').classed('end-icon', true)
      $node.append('div').classed('editor-node-entrance', true)
      return
    }

    const $node = (this.$node = this.editor.$nodes
      .append('div')
      .classed('editor-node', true)
      .attr('data-id', id)
      .style('left', `${x}px`)
      .style('top', `${y}px`))

    if (name) {
      $node
        .append('div')
        .classed('editor-node-content', true)
        .text(name)
        .attr('title', name)
    }

    $node.append('div').classed('editor-node-condition', true)
    $node.append('div').classed('editor-node-entrance', true)
    $node.append('div').classed('editor-node-export', true)

    // 设置icon
    // $node.insert('i')
    // ReactDom.render(
    //   <Icon type={getNodeIcon(this.iconType)} />,
    //   $node.select('i').node(),
    // )
  }

  /**
   * 关联两个节点
   */
  addConnect(targetId) {
    const target = this.editor.getNodeById(targetId)

    // 不允许关联自身
    // 特殊的图，已经有sourceNode的不能继续关联
    if (!target || target === this) {
      return
    }

    const lineId = targetId + 'line' + Math.random().toFixed(8)

    this.editor.$lines
      .append('path')
      .classed('editor-line', true)
      .attr('id', `editor-line-${this.id}-${targetId}`)
      .attr('data-id', lineId)
      .attr('data-sid', this.id)
      .attr('data-tid', targetId)
      .attr('d', this.getLinePath(this, target))
      .style('fill', 'none')
      .style('stroke-width', lineWidthNormal)
      .style('stroke', this.editor.lineColor)
      .style('marker-end', 'url(#line-triangle)')

    target.sourceNode = this
    target.sourceNodes[this.id] = this
    this.targetNodes[targetId] = target
  }

  /**
   * 两个节点之间的连线路径
   */
  getLinePath(sourceNode, targetNode) {
    const startX = sourceNode.x + sourceNode.width / 2
    const startY = sourceNode.y + sourceNode.height
    const endX = targetNode.x + targetNode.width / 2
    const endY = targetNode.y - 3

    const p = d3.path()

    p.moveTo(startX, startY)
    p.bezierCurveTo(startX, endY, endX, startY, endX, endY)

    return p.toString()
  }

  //更新执行条件
  updateCondition(condition) {
    this.$node
      .select('.editor-node-condition')
      .text(condition)
      .attr('title', condition)
  }
}

export default Node
