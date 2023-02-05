import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    actualTickers: [],
    previousTickers: [],
    IsLoading: true,
    IsError: false,
}


export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        getTickersRequested(state){
                state.isLoading = true;
                state.IsError = false;
        },
        getTickersActual(state, action){
                state.actualTickers = action.payload;
                state.IsLoading = false;
                state.IsError = false;
        },
        getTickersPrevious(state, action){
                state.previousTickers = action.payload;
                state.IsLoading = false;
                state.IsError = false;
        },
        getTickersError(state){
                state.IsLoading = false;
                state.IsError = true;
        },
    },
});

export const getTickers = (tickers) => (dispatch, getState) => {
    dispatch(
        getTickersPrevious(
            getState().tickers.actualTickers.map((ticker) => ({
                ticker: ticker.ticker,
                change_percent: ticker.change_percent,
            }))
        )
    );
    dispatch(getTickersActual(tickers));

}
export const tickersData = (state) => state.tickers;

export const {getTickersRequested, getTickersActual, getTickersPrevious, getTickersError} = storeSlice.actions;
export default storeSlice.reducer;