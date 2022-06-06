import { combineReducers } from "redux";
import devReducer from "./DevListReducer";
import currencyReducer from "./CurrencyReducer";
import favReducer from "./FavoriteReducer";


const rootReducer = combineReducers({
    devReducer,
    currencyReducer,
    favReducer,
});

export default rootReducer;