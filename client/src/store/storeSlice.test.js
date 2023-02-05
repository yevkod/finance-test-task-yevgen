import storeReducer, {
    getTickersActual,
    getTickersPrevious,
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

    describe("for 'getTickersActual' action", () => {
        it("should add new data to 'getTickersActual' property of state", () => {
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
    describe("for 'getTickersPrevious' action", () => {
        it("should add new data to 'getTickersPrevious' property of state", () => {
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
    describe("for 'getTickersError' action", () => {
        it("should return state with 'error' property", () => {
            expect(storeReducer(undefined, { type: getTickersError.type })).toEqual({
                actualTickers: [],
                previousTickers: [],
                IsLoading: false,
                IsError: true,
            });
        });
    });
});
