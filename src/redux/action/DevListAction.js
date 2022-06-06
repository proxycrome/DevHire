import axios from "axios";
import { FETCH_DEVELOPERS_START, FETCH_DEVELOPERS_SUCCESS, FETCH_DEVELOPERS_FAILURE } from "../types";



const fetchDevStart = () => ({
    type: FETCH_DEVELOPERS_START
})

const fetchDevSuccess = (data) => ({
    type: FETCH_DEVELOPERS_SUCCESS,
    payload: data
})

const fetchDevFailure = (err) => ({
    type: FETCH_DEVELOPERS_FAILURE,
    payload: err
})

export const fetchDevAsync = () => async(dispatch) => {
    try{
        dispatch(fetchDevStart());
        const response = await axios.get("https://api.terawork.com/service-categories/sellers-services/computer-software-development");
        dispatch(fetchDevSuccess(response.data));
    }catch(err){
        dispatch(fetchDevFailure(err.response));
    }    
}