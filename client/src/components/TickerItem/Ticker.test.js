import { render, screen } from "@testing-library/react";
import {TickerItem} from "./TickerItem";
import { Provider } from "react-redux";
import storeReducer from "../../store/storeSlice"
import {legacy_createStore as configureStore} from "@reduxjs/toolkit";

describe("<TickerItem /> component", () => {
    const store = configureStore(storeReducer, {
        tickers: {
            actualTickers: [],
            previousTickers: [],
            IsLoading: true,
            IsError: false,
        },
    });
    it("should render rightly using 'ticker' value", () => {
        render(
            <Provider store={store}>
                <TickerItem
                    tickerData={{
                        ticker: "FB",
                    }}
                />
            </Provider>
        );
        screen.getByText(/facebook/i);
    });


    it("should render the right variant of arrow using 'previousTickers' value", () => {
        const store = configureStore(storeReducer, {
            tickers: {
                actualTickers: [],
                previousTickers: [{ ticker: "FB", change_percent: "0.55" }],
                IsLoading: false,
                IsError: false,
            },
        });
        render(
            <Provider store={store}>
                <TickerItem
                    tickerData={{
                        ticker: "FB",
                        exchange: "NASDAQ",
                        price: 266.77,
                        change: 171.92,
                        change_percent: 0.75,
                        dividend: 0.52,
                        yield: 1.31,
                        last_trade_time: "2022-02-05T11:53:21.000Z",
                    }}
                />
            </Provider>
        );
        screen.getByText(/↑/i);
    });
});
