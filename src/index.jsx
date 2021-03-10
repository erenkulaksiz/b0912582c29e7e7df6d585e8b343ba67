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
import ViewSelective from './modules/viewselective/viewselective';
import Payment from './modules/payment/payment';
import Info from './modules/info/info';
import GotReservation from './modules/gotreservation/gotreservation';

const store = createStore(reducer);

const footerProgress = ['Kaydet ve Devam Et', 'Kaydet ve Devam Et', 'Ödeme Yap ve Bitir'];

const hotelsRoute = "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotels";
const hotelDetailsRoute = "https://5f6d939160cf97001641b049.mockapi.io/tkn/hotel-details";

const App = () => {

    const progress = store.getState().progress;
    const selectiveData = store.getState().selectiveData;
    const selectedRoom = store.getState().roomSelected.data;
    const selectedView = store.getState().viewSelected.data;
    const paymentDetails = store.getState().paymentDetails.data;
    const hotelList = store.getState().hotels;
    const hotelDetailList = store.getState().hotelDetails;

    const loadHotels = async () => {
        console.log("@loadHotels");
        try {
            await axios.get(hotelsRoute)
                .then(res => {
                    const data = res.data;
                    //console.log(data);
                    console.log("LOADED HOTELS: ", data);
                    store.dispatch({ type: 'SET_HOTELS', payload: data });
                })
                .catch(err => {
                    console.log(err.response.status);
                    if (err.response.status === 404) {
                        throw new Error('404');
                    }
                    throw err;
                })
        } catch (err) {
            console.log("%cCant fetch hotels:" + err, "color:red");
        }
    }

    const loadHotelDetails = async () => {
        console.log("@loadDetails");
        try {
            await axios.get(hotelDetailsRoute)
                .then(res => {
                    const data = res.data;
                    //console.log(data);
                    console.log("LOADED DETAILS: ", data);
                    store.dispatch({ type: 'SET_DETAILS', payload: data });
                })
                .catch(err => {
                    console.log(err.response.status);
                    if (err.response.status === 404) {
                        throw new Error('404');
                    }
                    throw err;
                })
        } catch (err) {
            console.log("Cant fetch details:" + err, "color:red");
        }
    }

    if (hotelList) {
        if (hotelList.length < 1) {
            loadHotels();
        }
    }

    if (hotelDetailList) {
        if (hotelDetailList.length < 1) {
            loadHotelDetails();
        }
    }

    const backProgress = () => {
        // senle işim olcak bekle

        store.dispatch({ type: 'BACK' });
    }

    const continueProgress = () => {
        // check states / validate

        console.log("selectiveData", selectiveData);

        if (progress == 1) {
            if (selectiveData.data) {
                // Eger data var ise islem yap.
                //const dateDiff = selectiveData.data.startdate - selectiveData.data.enddate;
                //const daysDiff = Math.floor(dateDiff / (1000 * 3600 * 24)) + 1;
                //console.log("daysdiff", daysDiff);
                /*if (daysDiff < 0 || daysDiff == 0) {
                    alert("check dates");
                } else {*/

                if (selectiveData.data.selectedHotel != 0) {
                    if (!selectiveData.data.startdate) {
                        alert("choose a start date");
                    } else {
                        if (!selectiveData.data.enddate) {
                            alert("choose a end date");
                        } else {
                            store.dispatch({ type: 'CONTINUE' });
                            console.log("hoteldetails ", hotelDetailList);
                            console.log("progress: ", progress);
                            window.scrollTo(0, 0);
                        }
                    }
                } else {
                    alert("choose a hotel");
                }
                //}
            } else {
                alert("fill the form");
            }
        } else if (progress == 2) {
            if (!selectedRoom) {
                alert("choose a room");
            } else {
                if (!selectedView != 0) {
                    alert("choose a view");
                } else {
                    store.dispatch({ type: 'CONTINUE' });
                    console.log("hoteldetails ", hotelDetailList);
                    console.log("progress: ", progress);
                    window.scrollTo(0, 0);
                }
            }
        } else if (progress == 3) {
            // Last progress
            console.log("paymentDetails", paymentDetails);

            if (paymentDetails) {
                if (paymentDetails.name) {
                    if (paymentDetails.number) {
                        if (paymentDetails.expiryDate) {
                            if (paymentDetails.expiryYear) {
                                if (paymentDetails.cvc) {
                                    // success
                                    store.dispatch({ type: 'CONTINUE' });
                                    window.scrollTo(0, 0);
                                } else {
                                    alert("enter cvc");
                                }
                            } else {
                                alert("enter expiryYear");
                            }
                        } else {
                            alert("enter expiryDate");
                        }
                    } else {
                        alert("enter card number");
                    }
                } else {
                    alert("enter name");
                }
            } else {
                alert("fill card data");
            }


        }

        console.log(progress, " progress");

    }

    const newReservation = () => {
        console.log("new reservation >>>");

        store.dispatch({ type: 'SET_HOTELS', payload: [] });
        store.dispatch({ type: 'SET_DETAILS', payload: [] });

        store.dispatch({ type: 'SET_PROGRESS', payload: 1 });
        store.dispatch({
            type: 'SET_SELECTIVEDATA', payload: {
                selectiveData: {
                    selectedHotel: 0,
                    startdate: null,
                    enddate: null,
                    adult: 1,
                    children: 1,
                    child_status: true,
                    max_adult_size: 5,
                },
            }
        });
        store.dispatch({
            type: 'SET_ROOMWVIEW', payload: {
                roomSelected: 0,
                viewSelected: 0
            }
        });
        store.dispatch({
            type: 'SET_PAYMENT', payload: {
                cvc: "",
                expiryDate: "",
                expiryYear: "",
                name: "",
                number: "",
            }
        })
    }

    const updateReservation = () => {
        store.dispatch({ type: 'SET_PROGRESS', payload: 1 });
    }

    const cancelReservation = () => {
        if (window.confirm('rezervasyonu cidden iptal etmek ister misiniz?')) {
            newReservation();
        }
    }

    return (
        <div className={styles.container}>
            <Header onButtonPress={() => { alert("selam") }} />
            <div className={styles.container__content}>
                {progress != 4 && <Stepper step={progress} />}
                <div className={styles.wrapper}>

                    {
                        progress == 1 &&
                        <Selective
                            hotels={hotelList}
                            states={data => { store.dispatch({ type: 'SELECTIVE_DATA', payload: { data } }); }}
                            currentData={selectiveData}
                            hotelDetails={hotelDetailList}
                        />
                    }

                    {
                        progress == 2 &&
                        <>
                            <HotelSelective
                                hotels={hotelList}
                                states={selectiveData}
                                hotelDetails={hotelDetailList}
                                child={selectiveData.data.child_status}
                            />
                            <div className={styles.selectiveWrapper}>
                                <RoomSelective
                                    cacheSelectedRoom={selectedRoom}
                                    hotelDetails={hotelDetailList}
                                    selectedHotel={selectiveData.data.selectedHotel}
                                    selectedRoom={data => { store.dispatch({ type: 'SELECT_ROOM', payload: { data } }); }}
                                />
                                <ViewSelective
                                    cacheSelectedView={selectedView}
                                    hotelDetails={hotelDetailList}
                                    selectedHotel={selectiveData.data.selectedHotel}
                                    selectedView={data => { store.dispatch({ type: 'SELECT_VIEW', payload: { data } }); }}
                                />
                            </div>
                        </>
                    }

                    {
                        progress == 3 &&
                        <div className={styles.paymentWrapper}>
                            <Payment
                                paymentDetails={data => { store.dispatch({ type: 'SET_PAYMENT', payload: { data } }); }}
                                currentPaymentDetails={paymentDetails}
                            />
                            <Info
                                hotelDetails={hotelDetailList}
                                selectiveData={selectiveData}
                                hotels={hotelList}
                                selectedRoom={selectedRoom}
                                selectedView={selectedView}
                                submitCouponCode={data => { alert(data) }}
                                withCoupon={true}
                            />
                        </div>
                    }

                    {
                        progress == 4 &&
                        <div>
                            <GotReservation
                                onNew={() => { newReservation(); }}
                                onUpdate={() => { updateReservation(); }}
                                onCancel={() => { cancelReservation(); }}
                            />
                            <Info
                                hotelDetails={hotelDetailList}
                                selectiveData={selectiveData}
                                hotels={hotelList}
                                selectedRoom={selectedRoom}
                                selectedView={selectedView}
                                withCoupon={false}
                            />
                        </div>
                    }

                </div>
            </div>

            {progress != 4 && <Footer onBack={() => {
                backProgress();
            }}
                onContinue={() => { continueProgress() }}
                showBack={progress != 1 ? true : false}
                continueText={footerProgress[progress - 1]}
            />}
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
