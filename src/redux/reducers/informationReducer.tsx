'use strict'

import { IS_CONNECTED } from "../constants"

const initialState: Object = {
  status: false
}

export default (state = initialState, action: any): Object => {
  switch(action.type) {
    case IS_CONNECTED:
      state = {
        ...state,
        status: action.status
      }
      break
    default:
      break
  }

  return state
}