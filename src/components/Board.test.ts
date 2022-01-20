import { mount } from '@vue/test-utils'
import Board from './Board.vue'

describe('Board', () => {

  const mountOptions = {
    props: {
      word: ''
    }
  }

  it('displays 6 rows of 5 tiles', () => {

    const wrapper = mount(Board, mountOptions)
    const rows = wrapper.findAll('.wordle-row')

    expect.assertions(7)
    expect(rows).toHaveLength(6)
    rows.forEach(row => {
      const tiles = row.findAll('.wordle-tile')
      expect(tiles).toHaveLength(5)
    })

  })

  it('has an input row of tiles', () => {

    const wrapper = mount(Board, mountOptions)
    const input = wrapper.find('.wordle-input')
    expect(input).toBeTruthy()
    const tiles = input.findAll('.wordle-input-tile')
    expect(tiles).toHaveLength(5)

  })

  it('has tiles in input row fill with word prop', () => {

    const word = 'obeso'
    const wrapper = mount(Board, {
      props: {
        ...mountOptions.props,
        word: word
      }
    })
    const tiles = wrapper.findAll('.wordle-input-tile')
    expect.assertions(5)
    tiles.forEach((tile, index) => expect(tile.text()).toBe(word[index]))

  })

  it('displays rowData prop info in top rows', () => {

    const rowData = [
      [
        { letter: 'o', state: 0 },
        { letter: 'b', state: 0 },
        { letter: 'e', state: 1 },
        { letter: 's', state: 2 },
        { letter: 'o', state: 2 },
      ],
      [
        { letter: 'q', state: 1 },
        { letter: 'u', state: 0 },
        { letter: 'e', state: 1 },
        { letter: 's', state: 0 },
        { letter: 'o', state: 2 },
      ]
    ]
    const wrapper = mount(Board, {
      props: {
        ...mountOptions.props,
        rowData
      }
    })
    const rows = wrapper.findAll('.wordle-check')
    expect.assertions(22)
    rows.forEach((row, rowIndex) => {

      expect(row).toBeTruthy()
      const tiles = row.findAll('.wordle-tile')
      tiles.forEach((tile, tileIndex) => {

        const data = rowData[rowIndex][tileIndex]
        expect(tile.text()).toBe(data.letter)
        expect(tile.classes()).toContain(`wordle-tile-${data.state}`)

      })

    })

  })

})