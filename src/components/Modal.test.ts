import { mount } from '@vue/test-utils'
import Modal from './Modal.vue'

describe('Modal', () => {

  let wrapper = mount(Modal)

  beforeEach(() => {
    wrapper = mount(Modal)
  })

  it('has a show prop that defaults to false', () => {

    expect(wrapper.props().show).toBe(false)

  })

  it('has display none when "show" is set false', async () => {

    expect.assertions(2)
    expect((<HTMLElement>wrapper.find('.modal').element).style.display).toBe('none')
    await wrapper.setProps({
      show: true
    })
    expect((<HTMLElement>wrapper.element).style.display).not.toBe('none')

  })

  it('has a title prop to display', async () => {

    expect.assertions(4)
    expect(wrapper.props().title).toBe('')
    await wrapper.setProps({
      title: 'Test'
    })
    expect(wrapper.props().title).toBe('Test')
    const title = wrapper.find('.modal-title')
    expect(title.exists()).toBe(true)
    expect(title.text()).toBe('Test')

  })

  it('has a button to close itself', async () => {

    expect.assertions(2)
    await wrapper.setProps({
      show: true
    })
    const button = wrapper.find('.modal-close')
    expect(button.exists()).toBe(true)
    await button.trigger('click')
    expect(wrapper.emitted('update:show')).toBeTruthy()

  })

  it('has a slot for content', () => {

    wrapper = mount(Modal, {
      slots: {
        default: 'Content'
      }
    })

    const content = wrapper.find('.modal-content')
    expect(content.text()).toBe('Content')

  })

  it('closes when clicking outside the window', async () => {

    expect.assertions(2)
    await wrapper.find('.modal-content').trigger('click')
    expect(wrapper.emitted('update:show')).toBeFalsy()
    await wrapper.find('.modal').trigger('click')
    expect(wrapper.emitted('update:show')).toBeTruthy()

  })

})