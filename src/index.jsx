import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.scss';
import axios from 'axios'

import { createStore } from 'redux';
import reducer from './reducers/index.js';

import styles from './styles/style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBed, faCreditCard, faSearch } from '@fortawesome/free-solid-svg-icons';

// Components
import Header from './modules/header/header';
import Footer from './modules/footer/footer';
import Stepper from './modules/stepper/stepper';
import Selective from './modules/selective/selective';

const store = createStore(reducer);

const hotels = [{ "id": "1", "hotel_name": "Bosphorus Hotel" },
{ "id": "2", "hotel_name": "Big Istanbul Hotel" },
{ "id": "3", "hotel_name": "Dela Hotel" },
{ "id": "4", "hotel_name": "Aegean Hotel" },
{ "id": "5", "hotel_name": "Lara Hotel" },
{ "id": "6", "hotel_name": "Bodrum Hotel" },
{ "id": "7", "hotel_name": "Visnezade Istanbul Hotel" },
{ "id": "8", "hotel_name": "Konak Istanbul Hotel" },
{ "id": "9", "hotel_name": "Dardania Hotel" },
{ "id": "10", "hotel_name": "Alanya Hotel" }]

const App = () => {

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className={styles.container}>
            <Header onButtonPress={() => { alert("selam") }} />
            <div className={styles.container__content}>
                <Stepper step={store.getState().progress} />
                <div className={styles.wrapper}>

                    {store.getState().progress == 1 && <Selective hotels={hotels} states={data => { console.log(data) }} />}
                    {store.getState().progress == 2 && <div>oda tipi</div>}
                    {store.getState().progress == 3 && <div>onizleme</div>}

                </div>
                <Footer onBack={() => { alert("sol") }} onContinue={() => { store.dispatch({ type: 'CONTINUE' }); }} showBack={false} continueText={"ilerle kardesim"} />
            </div>
        </div>
    )

}

const render = () => ReactDOM.render(
    <App />,
    document.getElementById('root')
)

render()
store.subscribe(render)

if (module.hot) {
    module.hot.accept();
}
