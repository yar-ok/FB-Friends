import {types, actionCreators} from '../actions/listActions';

const initialState = {
  todos: ['Click to remove', 'Learn React Native', 'Write Code', 'Ship App'],
};

const ListReducer = (state = initialState, action={}) => {

  const {todos} = state
  const {type, payload} = action

  switch (type) {
    case types.ADD: {
      return {
        ...state,
        todos: [payload, ...todos],
      }
    }
    case types.REMOVE: {
      return {
        ...state,
        todos: todos.filter((todo, i) => i !== payload),
      }
    }
  }

  return state
}

export default ListReducer
