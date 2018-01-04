import { Component } from 'react'

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
        title={item.title} renderNode={this.renderNode.bind(this)} />
    )
  }

  render() {
    return (
      <ul>
        { this.state.data.map(item => {
          return this.renderNode(item, this.props)
        }) }
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
    const children = this.state.data.map(item => {
      return this.props.renderNode(item, this.props)
    })

    return (
      <li>
        <span onClick={this.onToggle.bind(this)}>
          { this.props.title }
        </span>
        {
          this.state.data.length ?
          <ul style={{ display: this.state.open ? 'block' : 'none' }}>
          {
            children
          }
          </ul> : null

        }
      </li>
    )
  }
}
