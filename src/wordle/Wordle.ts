import dictionary from './dictionary'

export type letterData = {
  letter: string,
  state: 0 | 1 | 2
}

type letters = {
  [key: string]: number
}

export default class Wordle {
  word: string
  dictionary: string[]
  letters: letters | null

  constructor(word: string) {

    this.word = word
    this.dictionary = dictionary
    this.letters = null

  }

  static getWord(): string { return dictionary[Math.floor(Math.random() * dictionary.length)] }

  getLetters(): letters {

    if (this.letters) return { ...this.letters }

    this.letters = this.word.split('').reduce<letters>((obj, c) => {
      obj[c] = (obj[c] || 0) + 1
      return obj
    }, {})

    return this.getLetters()

  }

  check(word: string): letterData[] {

    if (!this.dictionary.includes(word)) throw new Error('No existe la palabra en el diccionario')

    const letters = this.getLetters()

    const checkedWord = word.split('').map((c, index) => {

      const data: letterData = { letter: c, state: 0 }
      if (c === this.word[index]) {
        data.state = 2
        letters[c]--
      }
      else if (letters[c] > 0) {
        data.state = 1
        letters[c]--
      }
      return data

    })

    Object.entries(letters).filter(([_, value]) => value < 0).forEach(([key, value]) => {

      checkedWord.reverse()

      for (let i = value; i < 0; i++) {

        const data = checkedWord.find(data => data.state === 1)
        if (!data) continue
        data.state = 0

      }

      checkedWord.reverse()

    })

    return checkedWord

  }
}