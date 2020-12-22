import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {

  
    test('should add a vote to anecdote', () => {
      const state = {}
      const action = {
        type: 'DO_NOTHING'
      }
  
      const newState = anecdoteReducer(undefined, action)
      expect(newState).toEqual(anecdotesAtStart)
    })
})
