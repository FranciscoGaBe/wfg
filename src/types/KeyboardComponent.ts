declare namespace KeyboardComponent {

  export type KeyStates = Record<string, number>

  export interface Props {
    keyStates?: KeyStates
  }

  export interface Emits {
    (e: 'key', letter: string): void,
    (e: 'enter'): void,
    (e: 'delete'): void
  }

}

export default KeyboardComponent