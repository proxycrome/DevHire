import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from "./rootReducer";

const middleware = [logger, thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;