import {createStore, applyMiddleware, combineReducers} from 'redux'

import thunk from 'redux-thunk'
import basicInfoReducer from './reducers/basicInfoReducer'


const rootReducer = combineReducers({
	basicInfoReducer
})

export default createStore(rootReducer, applyMiddleware(thunk))