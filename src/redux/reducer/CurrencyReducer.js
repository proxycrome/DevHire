import { FETCH_CURRENCY_START, FETCH_CURRENCY_SUCCESS, FETCH_CURRENCY_FAILURE } from "../types"

const initialState = {
    currencies: null,
    isLoading: false,
    currencyError: null,
}

const currencyReducer = (state=initialState, action) => {
    const {type, payload} = action
    switch(type){
        case FETCH_CURRENCY_START:
            state = {
                ...state,
                isLoading: true,
                currencies: null,
                currencyError: null,
            };
            break;

        case FETCH_CURRENCY_SUCCESS:
            state = {
                ...state,
                isLoading: false,
                currencies: payload,
                currencyError: null,
            };
            break;

        case FETCH_CURRENCY_FAILURE:
            state = {
                ...state,
                isLoading: false,
                currencyError: payload,
                currencies: null,
            };
            break;

        default:
            state = { ...state };
            break;
    }
    return state;
}

export default currencyReducer;