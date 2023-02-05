import {render, screen} from "@testing-library/react";
import {TickerList} from "./TickerList";
import {Provider} from "react-redux";
import {legacy_createStore as configureStore} from "@reduxjs/toolkit";
import storeReducer from "../../store/storeSlice"

describe("<TickerList /> component", () => {
    const store = configureStore(storeReducer, {
        tickers: {
            actualTickers: [],
            previousTickers: [],
            IsLoading: false,
            IsError: false,
        },
    });
    it("should render 'loading' text", () => {
        render(
            <Provider store={store}>
                <TickerList/>
            </Provider>
        );
        screen.getByText(/loading/i);
    });
});
