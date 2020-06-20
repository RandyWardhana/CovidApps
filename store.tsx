import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import covidReducer from './src/redux/reducers/covidReducer'
import informationReducer from './src/redux/reducers/informationReducer'

const rootReducer = combineReducers({
  covid: covidReducer,
  info: informationReducer
})

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)