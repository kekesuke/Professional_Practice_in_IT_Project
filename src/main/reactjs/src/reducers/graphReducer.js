import {GET_GRAPH, ADD_GRAPH, DELETE_GRAPH, GRAPH_LOADING} from '../actions/types'

const initialState = {
    graphs: [],
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_GRAPH:
            return {
                ...state,
                graphs: action.payload,
                loading: false
            };
        case DELETE_GRAPH:
            return {
                ...state,
                graphs: state.graphs.filter(graph => graph.id !== action.payload)
            };
        case GRAPH_LOADING:
            return {
                ...state,
                loading: true
            };
                  
        default:
            return state;
    }
}