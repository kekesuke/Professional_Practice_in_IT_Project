import axios from 'axios'
import {GET_GRAPH, ADD_GRAPH, DELETE_GRAPH, GRAPH_LOADING} from './types'


export const getGraph = () =>dispatch=>{
  dispatch(setGraphLoading());
  axios
    .get('https://finnhub.io/api/v1/crypto/candle?symbol=BINANCE:BTCUSDT&resolution=D&from=1576329600&to=1619121198&token=c0t93rv48v6r4maemvu0')
    .then(res =>
         dispatch({
             type: GET_GRAPH,
             payload: res.data
         }))
};

export const deleteGraph = (id) =>{
    return {
        type: DELETE_GRAPH,
        payload: id
    };
};

export const setGraphLoading = () =>{
    return {
        type: GRAPH_LOADING,
    };
};

