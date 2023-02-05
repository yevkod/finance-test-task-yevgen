import {configureStore} from "@reduxjs/toolkit";
import storeReducer from './storeSlice';
import logger from 'redux-logger'



export default configureStore({
    reducer: {
        tickers: storeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
