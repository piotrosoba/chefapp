const ADD_SNACK = 'snackbars/ADD_SNACK'
const REMOVE_SNACK = 'snackbars/REMOVE_SNACK'

const colors = {
  red: '#ff0000'
}

export const addSnackbar = (text, color = 'green', time = 3000) => (dispatch, getState) => {
  const key = Date.now()
  const rightColor = colors[color] || color
  dispatch(addSnackActionCreator(text, rightColor, key))
  setTimeout(() => dispatch(removeSnackActionCreator(key)), time)
}

const addSnackActionCreator = (text, color, key) => ({
  type: ADD_SNACK,
  text,
  color,
  key
})

const removeSnackActionCreator = (key) => ({
  type: REMOVE_SNACK,
  key
})

const initialState = {
  bars: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_SNACK:
      return {
        ...state,
        bars: [{
          text: action.text,
          color: action.color,
          key: action.key
        },
        ...state.bars,
        ]
      }
    case REMOVE_SNACK:
      return {
        ...state,
        bars: state.bars.filter(el => el.key !== action.key)
      }
    default:
      return state
  }
}