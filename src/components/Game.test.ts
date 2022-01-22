import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Wordle from '../wordle/Wordle'
import Game from './Game.vue'
import Board from './Board.vue'
import Keyboard from './Keyboard.vue'

describe('Game', () => {

  let wrapper = mount(Game)

  beforeEach(() => {
    wrapper = mount(Game)
  })

  it('has a Wordle instance', () => {
    expect(wrapper.vm.wordle).toBeInstanceOf(Wordle)
  })

  it('has a Board component', () => {
    const board = wrapper.findComponent(Board)
    expect(board.exists()).toBeTruthy()
  })

  it('has a Keyboard component', () => {
    const keyboard = wrapper.findComponent(Keyboard)
    expect(keyboard.exists()).toBeTruthy()
  })

  it('has a word variable set to empty', () => {
    expect(wrapper.vm.word).toBe('')
  })

  it('has a cleared variable set to false', () => {
    expect(wrapper.vm.cleared).toBe(false)
  })

  it('has a done variable set to false', () => {
    expect(wrapper.vm.done).toBe(false)
  })

  it('has a board variable set to empty array', () => {
    expect(wrapper.vm.board).toEqual([])
  })

  describe('word variable', () => {

    it('gets updated on keyboard event "key"', async () => {

      const keyboard = wrapper.findComponent(Keyboard)
      expect.assertions(3)
      expect(wrapper.vm.word).toBe('')
      await keyboard.vm.$emit('key', 'a')
      expect(wrapper.vm.word).toBe('a')
      await keyboard.vm.$emit('key', 'c')
      expect(wrapper.vm.word).toBe('ac')

    })

    it('doesn\'t get updated after 5 characters', async () => {

      const keyboard = wrapper.findComponent(Keyboard)
      expect.assertions(2)
      wrapper.vm.word = 'abcde'
      expect(wrapper.vm.word).toBe('abcde')
      await keyboard.vm.$emit('key', 'c')
      expect(wrapper.vm.word).toBe('abcde')

    })

    it('gets updated on keyboard event "delete"', async () => {

      const keyboard = wrapper.findComponent(Keyboard)
      expect.assertions(2)
      wrapper.vm.word = 'abcde'
      expect(wrapper.vm.word).toBe('abcde')
      await keyboard.vm.$emit('delete')
      expect(wrapper.vm.word).toBe('abcd')

    })

    it('gets cleared on keyboard event "enter" when word has length 5', async () => {

      const keyboard = wrapper.findComponent(Keyboard)
      expect.assertions(4)
      wrapper.vm.word = 'abcd'
      expect(wrapper.vm.word).toBe('abcd')
      await keyboard.vm.$emit('enter')
      expect(wrapper.vm.word).toBe('abcd')
      wrapper.vm.word = 'obeso'
      expect(wrapper.vm.word).toBe('obeso')
      await keyboard.vm.$emit('enter')
      expect(wrapper.vm.word).toBe('')

    })

    it('doesn\'t get updated in the board is done', async () => {

      const keyboard = wrapper.findComponent(Keyboard)
      expect.assertions(3)
      wrapper.vm.done = true
      expect(wrapper.vm.word).toBe('')
      expect(wrapper.vm.done).toBe(true)
      await keyboard.vm.$emit('key', 'a')
      expect(wrapper.vm.word).toBe('')

    })

    it('gets passed down to Board as word prop', async () => {

      const board = wrapper.findComponent(Board)
      expect.assertions(1)
      wrapper.vm.word = 'queso'
      await nextTick()
      expect(board.props().word).toBe('queso')

    })

  })

  describe('board variable', () => {

    it('gets passed down to Board as board prop', async () => {

      const wordle = new Wordle('queso')
      const data = wordle.check('obeso')
      const board = wrapper.findComponent(Board)
      expect.assertions(1)
      wrapper.vm.board.push(data)
      await nextTick()
      expect(board.props().board).toEqual([data])

    })

    it('gets updated on keyboard event "enter" with a full word', async () => {

      const keyboard = wrapper.findComponent(Keyboard)
      const wordle = new Wordle(wrapper.vm.wordle.word)
      wrapper.vm.word = 'queso'
      expect.assertions(1)
      await keyboard.vm.$emit('enter')
      expect(wrapper.vm.board).toEqual([
        wordle.check('queso')
      ])

    })

    it('sets done to true when full', async () => {

      expect.assertions(2)
      const keyboard = wrapper.findComponent(Keyboard)

      for (let i = 0; i < 6; i++) {

        wrapper.vm.word = 'queso'
        await keyboard.vm.$emit('enter')

      }

      expect(wrapper.vm.board).toHaveLength(6)
      expect(wrapper.vm.done).toBe(true)

    })

  })

  it('has a button to reset the game', async () => {

    expect.assertions(7)
    const keyboard = wrapper.findComponent(Keyboard)
    const button = wrapper.find('.wordle-reset')
    const wordleWord = wrapper.vm.wordle.word
    wrapper.vm.word = 'obeso'
    for (let i = 0; i < 6; i++) {

      wrapper.vm.word = 'queso'
      await keyboard.vm.$emit('enter')

    }
    wrapper.vm.done = true
    wrapper.vm.cleared = true
    wrapper.vm.keyStates.a = 1
    await nextTick()
    expect(button.exists()).toBeTruthy()
    await button.trigger('click')
    expect(wrapper.vm.word).toBe('')
    expect(wrapper.vm.board).toEqual([])
    expect(wrapper.vm.done).toEqual(false)
    expect(wrapper.vm.cleared).toEqual(false)
    expect(wrapper.vm.wordle.word).not.toBe(wordleWord)
    expect(wrapper.vm.keyStates).toEqual({})

  })

  it('sends keyStates to Keyboard prop', async () => {

    expect.assertions(1)
    const keyboard = wrapper.findComponent(Keyboard)
    wrapper.findComponent(Keyboard)
    wrapper.vm.wordle = new Wordle('queso')
    wrapper.vm.word = 'obeso'
    const keyStates = {
      o: 2,
      b: 0,
      e: 2,
      s: 2
    }
    await keyboard.vm.$emit('enter')
    await nextTick()

    expect(wrapper.vm.keyStates).toEqual(keyStates)

  })

})