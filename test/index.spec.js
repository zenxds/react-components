import { mount, shallow } from 'enzyme'
import {
  MemoryRouter as Router
} from 'react-router-dom'

import { startsWith } from '../src/utils'

// import Header from '../src/components/Header'

// test('header', () => {
//   const wrapper = mount(<Router><Header /></Router>)

//   expect(wrapper.html()).toBeTruthy()
// })


test('startsWith', () => {
  expect(startsWith('www.taobao.com', 'www.taobao')).toBeTruthy()
})
