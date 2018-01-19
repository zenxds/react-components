import { Component } from 'react'
import { Icon } from 'antd'

import styles from './tree.less'

export class Tree extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      // 顶层节点
      data: []
    }
    this.nodes = {}
  }

  componentDidMount() {
    this.props.loadNode().then(data => {
      this.setState({
        data
      })
    })
  }

  renderNode(item, props) {
    return (
      <TreeNode
        ref={node => {
          this.nodes[item.title] = node
        }}
        {...props}
        key={item.title}
        title={item.title}
        isDir={this.props.isDir(item)}
        level={props.level ?  props.level + 1 : 1}
        renderNode={this.renderNode.bind(this)}
      />
    )
  }

  render() {
    return (
      <ul className={styles.tree}>
        {
          this.state.data.map(item => {
            return this.renderNode(item, this.props)
          })
        }
      </ul>
    )
  }
}

export class TreeNode extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      open: false,
      loaded: false,
      loading: false,
      data: []
    }
  }

  onToggle(e) {
    e.stopPropagation()

    const open = !this.state.open

    // 打开时加载数据
    if (open && !this.state.loaded) {
      this.load()
    }

    this.setState({
      open
    })
  }

  load() {
    if (this.state.loading) {
      return
    }

    this.setState({
      loading: true
    })

    this.props.loadNode(this.props.title)
    .then(data => {
      this.setState({
        loading: false,
        loaded: true,
        data
      })
    })
    .catch(err => {
      this.setState({
        loading: false
      })
    })
  }

  render() {
    const { isDir, level, indent } = this.props
    const children = this.state.data.map(item => {
      return this.props.renderNode(item, this.props)
    })
    // 为了hover时标题背景变色，动态计算padding的距离
    const paddingLeft = (level - 1) * indent

    return (
      <li>
        <div
          style={{ paddingLeft }}
          className={styles['tree-title']}
          onClick={this.onToggle.bind(this)}
        >
          { isDir ? <Icon type={ this.state.open ? 'caret-down' : 'caret-right'} className={styles.arrow} /> : null }
          { isDir ? <Icon type={ this.state.open ? 'folder-open' : 'folder'} className={styles.folder} /> : null}
          { this.props.title }
        </div>

        {
          this.state.data.length ? (
            <ul className={ this.state.open ? styles.open : ''}>
            {
              children
            }
            </ul>
          ) : null
        }
      </li>
    )
  }
}
