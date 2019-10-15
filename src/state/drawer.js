const DRAWER_OPEN = 'drawer/OPEN'
const DRAWER_CLOSE = 'drawer/CLOSE'

export const openDrawerActionCreator = () => ({ type: DRAWER_OPEN })

export const closeDrawerActionCreator = () => ({ type: DRAWER_CLOSE })

const initialState = {
  isOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_OPEN:
      return {
        ...state,
        isOpen: true
      }
    case DRAWER_CLOSE:
      return {
        ...state,
        isOpen: false
      }
    default:
      return state
  }
}