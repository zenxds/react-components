import { Component, Fragment } from 'react'
import { Icon, Checkbox, message } from '@dx/xbee'
import PropTypes from 'prop-types'

import './tree.less'

export class Tree extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // 最顶层节点
      data: []
    }
    this.nodes = {}
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.props
      .fetchNodeData()
      .then(data => {
        this.setState({
          data
        })
      })
      .catch(err => {
        message.error(err + '')
      })
  }

  renderNode(node, props) {
    const key = node.key || node.title
    const { level } = props

    return (
      <TreeNode
        {...props}
        ref={node => {
          this.nodes[key] = node
        }}
        key={key}
        node={node}
        level={level ? level + 1 : 1}
        renderNode={this.renderNode.bind(this)}
      />
    )
  }

  render() {
    return (
      <ul styleName="tree">
        {this.state.data.map(node => {
          return this.renderNode(node, this.props)
        })}
      </ul>
    )
  }
}

Tree.propTypes = {
  fetchNodeData: PropTypes.func.isRequired
}

export class TreeNode extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      isLoading: false,
      isLoaded: false,
      checked: !!props.node.checked,
      data: []
    }
  }

  handleNodeClick() {
    const { node, onNodeClick } = this.props

    if (onNodeClick) {
      onNodeClick(node)
    }
  }

  handleToggle() {
    const isOpen = !this.state.isOpen

    // 打开时加载数据
    if (isOpen && !this.state.isLoaded) {
      this.fetchData()
    }

    this.setState({
      isOpen
    })
  }

  handleClick(e) {
    e.stopPropagation()

    const { node, isDir } = this.props

    if (isDir(node)) {
      this.handleToggle()
    } else {
      this.handleNodeClick()
    }
  }

  fetchData() {
    if (this.state.isLoading) {
      return
    }

    this.setState({
      isLoading: true
    })

    this.props
      .fetchNodeData(this.props.node)
      .then(data => {
        this.setState({
          isLoading: false,
          isLoaded: true,
          data
        })
      })
      .catch(err => {
        this.setState({
          isLoading: false
        })

        message.error(err + '')
      })
  }

  renderCheckbox() {
    const { checkable, node, onCheckChange } = this.props
    const { checked } = this.state

    if (!checkable || node.checkable === false) {
      return null
    }

    return (
      <Checkbox
        checked={checked}
        disabled={node.disabled}
        onClick={e => {
          e.stopPropagation()
        }}
        onChange={e => {
          this.setState({
            checked: e.target.checked
          })

          if (onCheckChange) {
            onCheckChange(node, e.target.checked)
          }
        }}
      />
    )
  }

  renderIcon() {
    const { node, isDir } = this.props
    const { isOpen } = this.state

    if (!isDir(node)) {
      return null
    }

    return (
      <Fragment>
        <Icon type={ isOpen ? 'caret-down' : 'caret-right'} styleName="arrow" />
        <Icon type={ isOpen ? 'folder-open' : 'folder'} styleName="folder" />
      </Fragment>
    )
  }

  renderChildren() {
    const { renderNode } = this.props
    const { isOpen, data } = this.state

    if (!data.length) {
      return null
    }

    const children = data.map(item => {
      return renderNode(item, this.props)
    })

    return <ul styleName={isOpen ? 'open' : ''}>{children}</ul>
  }

  render() {
    const { node, getNodeStyle, level } = this.props
    const style = getNodeStyle ? getNodeStyle(node, level) : {}

    return (
      <li>
        <div
          styleName="tree-title"
          title={node.title}
          style={style}
          onClick={this.handleClick.bind(this)}
        >
          { this.renderIcon() }
          { node.title }
          { this.renderCheckbox() }
        </div>

        { this.renderChildren() }
      </li>
    )
  }
}

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  fetchNodeData: PropTypes.func.isRequired,
  renderNode: PropTypes.func.isRequired,
  isDir: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  getNodeStyle: PropTypes.func,
  onNodeClick: PropTypes.func,
  onCheckChange: PropTypes.func,
  checkable: PropTypes.bool
}
