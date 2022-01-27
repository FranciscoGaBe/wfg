import { DOMWrapper, mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import KeyboardComponent from '../types/KeyboardComponent'
import Keyboard from './Keyboard.vue'

const letters = 'abcdefghijklmnñopqrstuvwxyz'

describe('Keyboard', () => {

  interface Options {
    props: KeyboardComponent.Props
  }

  let wrapper = mount(Keyboard)

  beforeEach(() => {
    wrapper = mount(Keyboard)
  })

  it('has all the letters in the dictionary', () => {

    const keys = wrapper.findAll('.keyboard-key')
    expect(keys).toHaveLength(letters.length + 2)

  })

  it('emits "key" event when click on key', async () => {
    const key = wrapper.find('.keyboard-key')
    expect.assertions(1)
    await key.trigger('click')
    expect(wrapper.emitted().key).toBeTruthy()
  })

  it('has enter key, emits "enter" on click', async () => {
    const key = wrapper.find('.keyboard-enter')
    expect.assertions(2)
    expect(key.exists()).toBeTruthy()
    await key.trigger('click')
    expect(wrapper.emitted().enter).toBeTruthy()
  })

  it('has delete key, emits "delete" on click', async () => {
    const key = wrapper.find('.keyboard-delete')
    expect.assertions(2)
    expect(key.exists()).toBeTruthy()
    await key.trigger('click')
    expect(wrapper.emitted().delete).toBeTruthy()
  })

  it('sets classes of keys in "keyStates" prop', () => {

    const options: Options = {
      props: {
        keyStates: {
          a: 0,
          t: 1,
          o: 2
        }
      }
    }

    wrapper = mount(Keyboard, options)

    const aKey = wrapper.find('.keyboard-key-a')
    const tKey = wrapper.find('.keyboard-key-t')
    const oKey = wrapper.find('.keyboard-key-o')

    expect(aKey.exists()).toBeTruthy()
    expect(tKey.exists()).toBeTruthy()
    expect(oKey.exists()).toBeTruthy()
    expect(aKey.classes()).toContain('keyboard-key-state-0')
    expect(tKey.classes()).toContain('keyboard-key-state-1')
    expect(oKey.classes()).toContain('keyboard-key-state-2')

  })

  it('accepts keyboard input', async () => {

    expect.assertions(3)

    const body = new DOMWrapper(document.body)
    letters.split('').forEach(letter => {

      body.trigger('keydown', {
        key: letter
      })

    })

    await nextTick()
    expect(wrapper.emitted().key.flatMap(data => data).join('')).toBe(letters)

    body.trigger('keydown.enter')
    body.trigger('keydown.backspace')
    await nextTick()
    expect(wrapper.emitted().enter).toBeTruthy()
    expect(wrapper.emitted().delete).toBeTruthy()

  })

})