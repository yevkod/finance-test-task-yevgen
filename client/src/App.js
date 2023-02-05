import './App.css';
import {Header} from "./components/Header/Header";
import {TickerList} from "./components/TickerList/TickerList";


export const App = () => {
    return (
        <div className="App">
            <Header/>
            <TickerList/>
        </div>
    );
}


