import { mount } from '@vue/test-utils'
import BoardComponent from '../types/BoardComponent'
import Board from './Board.vue'

describe('Board', () => {

  interface Options {
    props: BoardComponent.Props
  }

  const mountOptions: Options = {
    props: {
      word: ''
    }
  }

  const getWrapperWithBoard = (boardSize: number) => {

    const board: BoardComponent.Board = Array(boardSize).fill(0).map(() => {

      return [
        { letter: 'q', state: 1 },
        { letter: 'u', state: 0 },
        { letter: 'e', state: 1 },
        { letter: 's', state: 0 },
        { letter: 'o', state: 2 },
      ]

    })

    return mount(Board, {
      props: {
        ...mountOptions.props,
        board
      }
    })

  }

  it('displays 6 rows of 5 tiles', () => {

    const wrapper = mount(Board, mountOptions)
    const rows = wrapper.findAll('.board-row')

    expect.assertions(7)
    expect(rows).toHaveLength(6)
    rows.forEach(row => {
      const tiles = row.findAll('.board-tile')
      expect(tiles).toHaveLength(5)
    })

  })

  it('has an input row of tiles', () => {

    const wrapper = mount(Board, mountOptions)
    const input = wrapper.find('.board-input')
    expect(input).toBeTruthy()
    const tiles = input.findAll('.board-input-tile')
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
    const tiles = wrapper.findAll('.board-input-tile')
    expect.assertions(5)
    tiles.forEach((tile, index) => expect(tile.text()).toBe(word[index]))

  })

  it('displays rowData prop info in top rows', () => {

    const board: BoardComponent.Board = [
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
        board
      }
    })
    const rows = wrapper.findAll('.board-check')
    expect.assertions(22)
    rows.forEach((row, rowIndex) => {

      expect(row).toBeTruthy()
      const tiles = row.findAll('.board-tile')
      tiles.forEach((tile, tileIndex) => {

        const data = board[rowIndex][tileIndex]
        expect(tile.text()).toBe(data.letter)
        expect(tile.classes()).toContain(`board-tile-${data.state}`)

      })

    })

  })

  it('doesn\'t display empty rows at size 5+', () => {

    let wrapper = getWrapperWithBoard(5)
    let emptyRows = wrapper.findAll('.board-empty')
    expect(emptyRows).toHaveLength(0)
    wrapper = getWrapperWithBoard(20)
    emptyRows = wrapper.findAll('.board-empty')
    expect(emptyRows).toHaveLength(0)

  })

  it('doesn\'t display input row at size 6+', () => {

    let wrapper = getWrapperWithBoard(6)
    let inputRow = wrapper.find('.board-input')
    expect(inputRow.exists()).toBeFalsy()
    wrapper = getWrapperWithBoard(20)
    inputRow = wrapper.find('.board-input')
    expect(inputRow.exists()).toBeFalsy()

  })

})