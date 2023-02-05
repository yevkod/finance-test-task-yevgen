import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {tickersData} from '../../store/storeSlice'
import s from './Ticker.module.css';

export const TickerItem = ({tickerData}) => {

    const {
        ticker,
        price,
        change,
        change_percent,
        dividend,
        yield: income,
        last_trade_time,
    } = tickerData;
    const companies = {
        AAPL: "Apple",
        GOOGL: "Alphabet",
        MSFT: "Microsoft",
        AMZN: "Amazon",
        FB: "Facebook",
        TSLA: "Tesla",
    }

    const [positiveTrend, setPositiveTrend] = useState(false)
    const {previousTickers} = useSelector(tickersData)

    useEffect(() => {
        previousTickers.map((previousData) => {
            if (
                previousData.ticker === ticker &&
                previousData.change_percent > change_percent
            ) {
                setPositiveTrend(false)
            } else if (
                previousData.ticker === ticker &&
                previousData.change_percent < change_percent
            ) {
                setPositiveTrend(true)
            }
            return previousData;
        })
    }, [previousTickers, change_percent, ticker])

    const getRandomNum = (min, max) =>
        Math.ceil(Math.random() * (max - min) + min);

    const style = {
        backgroundColor: `rgb(${getRandomNum(0, 255)}, ${getRandomNum(0, 255)}, ${getRandomNum(0, 255)}`,
    }

    const time = new Date(last_trade_time)

    return (
        <tr className={s.table}>
            <td>{companies[ticker]}</td>
            <td className={s.ticker} style={style}>
                {ticker}
            </td>
            <td>{price}</td>
            <td>{change}</td>
            <td className={positiveTrend ? s.positive : s.negative}>
                {positiveTrend ? "↑" : "↓"} {change_percent} %
            </td>
            <td>{dividend}</td>
            <td>{income}</td>
            <td>
                {time.toLocaleTimeString()} ({time.toLocaleDateString()})
            </td>
        </tr>
    );
};


