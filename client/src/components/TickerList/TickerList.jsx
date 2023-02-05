import React, {useEffect} from 'react';
import {Circles} from "react-loader-spinner";
import io from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {getTickersRequested, getTickers, getTickersError} from "../../store/storeSlice";
import {TickerItem} from "../TickerItem/TickerItem";
import {tickersData} from '../../store/storeSlice'
import s from './Ticker.module.css';


const socket = io('http://localhost:4000')

export const TickerList = () => {

    const dispatch = useDispatch();
    const {actualTickers, IsLoading, IsError} = useSelector(tickersData);

    useEffect(() => {
        dispatch(getTickersRequested())
        socket.emit('start');
        socket.on('ticker', (quotes) => dispatch(getTickers(quotes)));
        socket.on('connect_error', function () {
            dispatch(getTickersError())
        })
        return () => {
            socket.removeAllListeners();
        }
    }, [dispatch])

    const tickerItems = actualTickers.map((tickerData) => (
        <TickerItem key={tickerData.ticker} tickerData={tickerData}/>
    ))


    const tableTitles = [
        "company",
        "ticker",
        "price",
        "change",
        "change percent",
        "dividend",
        "yield",
        "last trade time",
    ];

    const titleItems = tableTitles.map((title) => <th key={title}>{title}</th>)
    return (
        <main className={s.main}>
            {IsLoading && (
                <div className={s.loader_container}>
                    <Circles
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="circles-loading"
                        visible={true}
                    />
                    <p className={s.loader}>loading</p>
                </div>
            )}
            {IsError && (
                <p className={s.error}>
                    Sorry, we have a problem to connect. Please, visit site later.
                </p>
            )}
            {!IsLoading && !IsError && (
                <>
                    <h3 className={s.title}>Stocks</h3>
                    <div className={s.block}>
                        <table className={s.table}>
                            <thead>
                            <tr className={s.heading}>{titleItems}</tr>
                            </thead>
                            <tbody>
                            {tickerItems}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </main>
    );
};
