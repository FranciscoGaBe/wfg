declare namespace BoardComponent {
  export interface Tile {
    letter: string,
    state: 0 | 1 | 2
  }
  export type Row = Tile[]
  export type Board = Row[]
  export interface Props {
    board?: Board,
    word: string
  }
}

export default BoardComponent