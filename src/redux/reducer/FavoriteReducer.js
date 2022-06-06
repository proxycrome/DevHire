import { POST_FAVORITES } from "../types"

const initialState = {
    favorites: null,
}

const favReducer = (state=initialState, action) => {
    const {type, payload} = action
    switch(type){
        case POST_FAVORITES:
            state = {
                ...state,
                favorites: payload,
            };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default favReducer;