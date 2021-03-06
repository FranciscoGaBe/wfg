import Wordle from './Wordle'

describe('Wordle', () => {

  let wordle = new Wordle('')

  beforeEach(() => {
    wordle = new Wordle('obeso')
  })

  it('has a dictionary of spanish words with 5 letters', () => {
    expect(wordle.dictionary).toEqual(expect.any(Array))
    expect(wordle.dictionary[1]).toHaveLength(5)
  })

  it('starts the game with a given word', () => {
    expect(wordle.word).toBe('obeso')
  })

  describe('.getWord', () => {
    it('returns a random word from the dictionary', () => {
      const word = Wordle.getWord()
      expect(word).toEqual(expect.any(String))
      expect(word).toHaveLength
    })
  })

  describe('.check', () => {
    it('throws error if word doesn\'t exists', () => {
      expect(() => { wordle.check('lllll') }).toThrow('existe')
    })

    it('accepts a word and tells if any letter is in the word', () => {
      const checkedWord = wordle.check('sesos')
      expect(checkedWord[0]).toEqual({ letter: 's', state: 1 })
      expect(checkedWord[1]).toEqual({ letter: 'e', state: 1 })
      expect(checkedWord[2]).toEqual({ letter: 's', state: 0 })
      expect(checkedWord[3]).toEqual({ letter: 'o', state: 1 })
      expect(checkedWord[4]).toEqual({ letter: 's', state: 0 })
    })

    it('accepts a word and tells if any letter is in the correct position', () => {
      const checkedWord = wordle.check('queso')
      expect(checkedWord[0]).toEqual({ letter: 'q', state: 0 })
      expect(checkedWord[1]).toEqual({ letter: 'u', state: 0 })
      expect(checkedWord[2]).toEqual({ letter: 'e', state: 2 })
      expect(checkedWord[3]).toEqual({ letter: 's', state: 2 })
      expect(checkedWord[4]).toEqual({ letter: 'o', state: 2 })
    })

    it('returns all data with state 2 if correct', () => {

      const checkedWord = wordle.check('obeso')
      const data = 'obeso'.split('').map(letter => ({
        letter,
        state: 2
      }))

      expect(checkedWord).toEqual(data)

    })

    it('if a letter is in it\'s correct position, it shouldn\' appear as being in the word again - 1', () => {

      wordle = new Wordle('sueco')
      const checkedWord = wordle.check('sesos')
      const data = [
        { letter: 's', state: 2 },
        { letter: 'e', state: 1 },
        { letter: 's', state: 0 },
        { letter: 'o', state: 1 },
        { letter: 's', state: 0 },
      ]

      expect(checkedWord).toEqual(data)

    })

    it('if a letter is in it\'s correct position, it shouldn\' appear as being in the word again - 2', () => {

      wordle = new Wordle('pepla')
      const checkedWord = wordle.check('plata')
      const data = [
        { letter: 'p', state: 2 },
        { letter: 'l', state: 1 },
        { letter: 'a', state: 0 },
        { letter: 't', state: 0 },
        { letter: 'a', state: 2 },
      ]

      expect(checkedWord).toEqual(data)

    })

    it('if a letter is in it\'s correct position, it shouldn\' appear as being in the word again - 3', () => {

      wordle = new Wordle('luian')
      const checkedWord = wordle.check('alias')
      const data = [
        { letter: 'a', state: 0 },
        { letter: 'l', state: 1 },
        { letter: 'i', state: 2 },
        { letter: 'a', state: 2 },
        { letter: 's', state: 0 },
      ]

      expect(checkedWord).toEqual(data)

    })
  })

})