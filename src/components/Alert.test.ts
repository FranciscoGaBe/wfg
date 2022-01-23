import { mount } from '@vue/test-utils'
import Alert from './Alert.vue'

describe('Alert', () => {

  let wrapper = mount(Alert)

  beforeEach(() => {
    wrapper = mount(Alert)
  })

  it('has a method to display a message for 3 seconds', async () => {

    expect.assertions(4)
    jest.useFakeTimers()
    expect(wrapper.vm.show).toBe(false)
    await wrapper.vm.alert('Test message')
    const div = wrapper.find('.alert-message')
    expect(div.text()).toBe('Test message')
    expect(wrapper.vm.show).toBe(true)
    jest.advanceTimersByTime(3000)
    expect(wrapper.vm.show).toBe(false)
    jest.useRealTimers()

  })

})