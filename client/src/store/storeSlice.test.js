import storeReducer, {
    getTickersActual,
    getTickersPrevious,
    getTickersRequested,
    getTickersError,
} from './storeSlice';

describe('storeSlice', () => {
    const state = {
        actualTickers: [],
        previousTickers: [],
        IsLoading: true,
        IsError: false,
    };
    it('should return default state when passed when passed an empty action', () => {
        const result = storeReducer(undefined, {});

        expect(result).toEqual(state);
    });

    describe("for GET_TICKERS_REQUESTED action", () => {
        it("should return state with truthy 'loading' property", () => {
            expect(storeReducer(state, { type: getTickersRequested.type })).toEqual({
                IsLoading: true,
                actualTickers: [],
                previousTickers: [],
                IsError: false,
            });
        });
    });
    describe("for GET_TICKERS_ACTUAL action", () => {
        it("should add passed data to 'actualTickers' property of state", () => {
            expect(
                storeReducer(undefined,{
                    type: getTickersActual.type,
                    payload: [
                        {
                            ticker: "GOOGL",
                            price: 237.08,
                        },
                        {
                            ticker: "MSFT",
                            price: 261.46,
                        },
                    ],
                })
            ).toEqual({
                IsLoading: false,
                IsError: false,
                actualTickers: [
                    {
                        ticker: "GOOGL",
                        price: 237.08,
                    },
                    {
                        ticker: "MSFT",
                        price: 261.46,
                    },
                ],
                previousTickers: [],
            });
        });
    });
    describe("for GET_TICKERS_PREVIOUS action", () => {
        it("should add passed data to 'previousTickers' property of state", () => {
            expect(
                storeReducer(state, {
                    type: getTickersPrevious.type,
                    payload: [
                        {
                            ticker: "AMZN",
                            price: 260.34,
                        },
                    ],
                })
            ).toEqual({
                IsLoading: false,
                IsError: false,
                actualTickers: [],
                previousTickers: [
                    {
                        ticker: "AMZN",
                        price: 260.34,
                    },
                ],
            });
        });
    });
    describe("for GET_TICKERS_ERROR action", () => {
        it("should return state with truthy 'error' property", () => {
            expect(storeReducer(undefined, { type: getTickersError.type })).toEqual({
                actualTickers: [],
                previousTickers: [],
                IsLoading: false,
                IsError: true,
            });
        });
    });
});
