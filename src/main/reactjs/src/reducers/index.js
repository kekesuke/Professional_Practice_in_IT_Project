import {combineReducers} from 'redux';
import graphReducer from './graphReducer' 
import errorReducer from './errorReducer' 
import authReducer from './authReducer' 


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    graph: graphReducer
    
})