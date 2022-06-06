import axios from "axios";
import { FETCH_CURRENCY_START, FETCH_CURRENCY_SUCCESS, FETCH_CURRENCY_FAILURE } from "../types";



const fetchCurrencyStart = () => ({
    type: FETCH_CURRENCY_START
})

const fetchCurrencySuccess = (data) => ({
    type: FETCH_CURRENCY_SUCCESS,
    payload: data,
})

const fetchCurrencyFailure = (err) => ({
    type: FETCH_CURRENCY_FAILURE,
    payload: err,
})

export const fetchCurrencyAsync = () => async(dispatch) => {
    try{
        dispatch(fetchCurrencyStart());
        const response = await axios.get("https://api.terawork.com/resources");
        dispatch(fetchCurrencySuccess(response.data));
    }catch(err){
        dispatch(fetchCurrencyFailure(err.response));
    }    
}