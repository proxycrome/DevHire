import { POST_FAVORITES } from "../types";



const postFavorite = (data) => ({
    type: POST_FAVORITES,
    payload: data,
})


export const postFavoriteAsync = (data) => async(dispatch) => {
    try{
        dispatch(postFavorite(data));
    }catch(err){
        console.log(err);
    }    
}