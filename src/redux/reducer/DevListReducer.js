import { FETCH_DEVELOPERS_START, FETCH_DEVELOPERS_SUCCESS, FETCH_DEVELOPERS_FAILURE } from "../types"

const initialState = {
    developers: null,
    isLoading: false,
    error: null,
}
const devReducer = (state=initialState, action) => {
    const {type, payload} = action
    switch(type){
        case FETCH_DEVELOPERS_START:
            state = {
                ...state,
                isLoading: true,
                developers: null,
                error: null,
            };
            break;

        case FETCH_DEVELOPERS_SUCCESS:
            state = {
                ...state,
                isLoading: false,
                developers: payload,
                error: null,
            };
            break;

        case FETCH_DEVELOPERS_FAILURE:
            state = {
                ...state,
                isLoading: false,
                error: payload,
                developers: null,
            };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default devReducer;