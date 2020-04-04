import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import covidReducer from './src/redux/reducers/covidReducer'

const rootReducer = combineReducers(
  { covid: covidReducer }
)

export default createStore(
  rootReducer,
  applyMiddleware(thunk)
)