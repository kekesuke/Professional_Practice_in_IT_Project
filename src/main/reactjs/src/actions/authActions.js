import axios from 'axios'
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL
} from "./types"

//register
export const register = ({ email, username, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body 
    const body = JSON.stringify({ email, username, password })

    axios.post('http://localhost:8080/api/auth/signup', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


export const login = ({ username, password }) => dispatch => {
    //headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    //request body 
    const body = JSON.stringify({ username, password })

    axios.post('http://localhost:8080/api/auth/signin', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS ,
            payload: res.data 
        }))// IF its succsess we send the payload to auth reducer else send error
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

export const loadUser = () => (dispatch, getState) => {
    //setting user loading to true
    dispatch({ type: USER_LOADING });
    //get token from localstorage
    var user = JSON.parse(localStorage.getItem('user'))
       if(user) {
        dispatch({ type: USER_LOADED, payload: user.username});
       
       }
    
}

//logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

