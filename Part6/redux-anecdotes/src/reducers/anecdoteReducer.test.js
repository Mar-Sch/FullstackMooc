import anecdoteReducer from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {
    const initialState = [
            'anecdote 1',
            'anecdote 2'
        ]
  
    test('should return a proper initial state when called with undefined state', () => {
      const state = {}
      const action = {
        type: 'DO_NOTHING'
      }
  
      const newState = anecdoteReducer(undefined, action)
      expect(newState).toEqual(initialState)
    })
})
