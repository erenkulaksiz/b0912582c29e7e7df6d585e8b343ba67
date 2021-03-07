import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.scss';
import axios from 'axios'

import { createStore } from 'redux';
import reducer from './reducers/index.js';

import styles from './styles/style.module.scss';

// Components
import Header from './modules/header/header';
import Footer from './modules/footer/footer';
import Stepper from './modules/stepper/stepper';
import Selective from './modules/selective/selective';
import HotelSelective from './modules/hotelselective/hotelselective';
import RoomSelective from './modules/roomselective/roomselective';

import HotelDetails from './hoteldetails.jsx'

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

const footerProgress = ['Kaydet ve Devam Et', 'Kaydet ve Devam Et', 'Ödeme Yap ve Bitir'];

const App = () => {

    const progress = store.getState().progress;
    const selectiveData = store.getState().selectiveData;

    const backProgress = () => {
        // senle işim olcak bekle

        store.dispatch({ type: 'BACK' });
    }

    const continueProgress = () => {
        // check states / validate

        console.log("selectiveData", selectiveData);

        if (selectiveData.data) {
            // Eger data var ise islem yap.
            //const dateDiff = selectiveData.data.startdate - selectiveData.data.enddate;
            //const daysDiff = Math.floor(dateDiff / (1000 * 3600 * 24)) + 1;
            //console.log("daysdiff", daysDiff);
            /*if (daysDiff < 0 || daysDiff == 0) {
                alert("check dates");
            } else {*/
            if (selectiveData.data.selectedHotel != 0) {
                store.dispatch({ type: 'CONTINUE' });
                console.log(HotelDetails);
            } else {
                alert("choose a hotel");
            }
            //}
        } else {
            alert("fill the form");
        }

    }

    return (
        <div className={styles.container}>
            <Header onButtonPress={() => { alert("selam") }} />
            <div className={styles.container__content}>
                <Stepper step={progress} />
                <div className={styles.wrapper}>

                    {progress == 1 &&
                        <Selective
                            hotels={hotels}
                            states={data => { console.log(data); store.dispatch({ type: 'SELECTIVE_DATA', payload: { data } }); }}
                            currentData={selectiveData} />}

                    {(() => {
                        if (progress == 2) {
                            return (
                                <>
                                    <HotelSelective
                                        hotels={hotels}
                                        states={selectiveData}
                                        hotelDetails={HotelDetails} />
                                    <RoomSelective />
                                </>
                            );
                        }
                    })()}

                    {progress == 3 && <div>onizleme</div>}

                </div>
                {progress != 4 && <Footer onBack={() => {
                    backProgress();
                }}
                    onContinue={() => { continueProgress() }}
                    showBack={progress != 1 ? true : false}
                    continueText={footerProgress[progress - 1]}
                />}
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
