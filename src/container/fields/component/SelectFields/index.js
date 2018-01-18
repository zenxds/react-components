/**
 * 多个字段选择
 *
 * 穿梭框和select不满足需求，自己写一个
 */
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Modal, Row, Col, Checkbox, Icon, Radio } from 'antd'

import styles from './less/styles.less'

/**
 * multiple
 * options
 * onChange
 * value
 */
@CSSModules(styles)
class SelectFields extends Component {

  constructor(props, context) {
    super(props, context)

    this.state = {
      showModal: false,
      value: props.value
    }
  }

  /**
   * 选中的选项
   */
  getCheckdMap() {
    const multiple = this.props.multiple
    const value = this.state.value
    const checkedMap = {}

    if (multiple) {
      value.forEach(item => {
        checkedMap[item] = 1
      })
    } else if(value) {
      checkedMap[value] = 1
    }

    return checkedMap
  }

  /**
   * 分组数据
   */
  getGroupMap() {
    const options = this.props.options || []
    const groupMap = {}

    options.forEach(item => {
      groupMap[item.type] = groupMap[item.type] || []
      groupMap[item.type].push(item.name)
    })

    return groupMap
  }

  /**
   * 字段类型数据
   */
  getTypeMap() {
    const options = this.props.options || []
    const typeMap = {}

    options.forEach(item => {
      typeMap[item.name] = item.type
    })

    return typeMap
  }

  onClick() {
    this.setState({
      showModal: true
    })
  }

  onCheckedChange(v) {
    this.setState({
      value: v
    })
  }

  onRadioChange(e) {
    this.setState({
      value: e.target.value
    })
  }

  onDeleteItem(item, e) {
    const checkedMap = this.getCheckdMap()
    delete checkedMap[item]

    this.setState({
      value: this.props.multiple ? Object.keys(checkedMap) : ''
    })
  }

  // 选择一组
  onGroupChange(group, e) {
    const groupMap = this.getGroupMap()
    const checkedMap = this.getCheckdMap()
    const checked = e.target.checked

    groupMap[group].forEach(item => {
      if (checked) {
        checkedMap[item] = 1
      } else {
        delete checkedMap[item]
      }
    })

    this.setState({
      value: Object.keys(checkedMap)
    })
  }

  getModal() {
    const multiple = this.props.multiple
    const value = this.state.value

    const groupMap = this.getGroupMap()
    const checkedMap = this.getCheckdMap()
    const typeMap = this.getTypeMap()

    return (
      <Modal
        title={'选择字段'}
        visible={true}
        width={720}
        styleName="modal"
        onCancel={() => {
          this.setState({
            showModal: false
          })
        }}
        onOk={() => {
          this.setState({
            showModal: false
          })

          this.props.onChange(this.state.value)
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <div styleName="col-1">
              <dl>
                {
                  Object.keys(groupMap).map(group => {
                    const groupChecked = groupMap[group].every(item => {
                      return !!checkedMap[item]
                    })
                    const hiddenKey = group + 'Hidden'

                    return (
                      <React.Fragment key={group}>
                        <dt>
                          {
                            multiple ? (
                              <Checkbox checked={groupChecked} onChange={this.onGroupChange.bind(this, group)}>{ group }</Checkbox>
                            ) : group
                          }
                          <Icon type={this.state[hiddenKey] ? 'down' : 'up'} onClick={() => {
                            this.setState({
                              [hiddenKey]: !this.state[hiddenKey]
                            })
                          }} />
                        </dt>
                        {
                          multiple ? (
                            <Checkbox.Group value={value} onChange={this.onCheckedChange.bind(this)}>
                            {
                              groupMap[group].map(item => {
                                return <dd key={item} hidden={this.state[group + 'Hidden']}><Checkbox value={item}>{ item }</Checkbox></dd>
                              })
                            }
                            </Checkbox.Group>
                          ) : (
                            <Radio.Group onChange={this.onRadioChange.bind(this)} value={value} style={{ display : 'block' }}>
                            {
                              groupMap[group].map(item => {
                                return <dd key={item} hidden={this.state[group + 'Hidden']}><Radio value={item}>{ item }</Radio></dd>
                              })
                            }
                            </Radio.Group>
                          )
                        }
                      </React.Fragment>
                    )
                  })
                }
              </dl>
            </div>
          </Col>
          <Col span={12}>
            <div styleName="col-2">
              <table>
                <thead>
                  <tr>
                    <th>字段</th><th>类型</th><th>操作</th>
                  </tr>
                </thead>
                <tbody>
                {
                  Object.keys(checkedMap).map(item => {
                    return (
                      <tr key={item}>
                        <td>{item}</td>
                        <td>{typeMap[item]}</td>
                        <td><Icon type="delete" onClick={this.onDeleteItem.bind(this, item)} /></td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Modal>
    )
  }

  render() {
    // value是实际选中以后的值，外面需要set，并传入
    const { value, multiple } = this.props

    return (
      <div styleName="container">
        { value.length === 0 ? (
          <span onClick={this.onClick.bind(this)}>请选择字段</span>
        ) : (
          <span onClick={this.onClick.bind(this)}>已选择<em>{ multiple ? value.length + '个': value}</em>字段</span>
        )
        }

         { this.state.showModal ? this.getModal() : null }
      </div>
    )
  }
}

 export default SelectFields
