import React, { Component } from 'react'
import styles from './selective.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Selective extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedHotel: 0,
            startdate: null,
            enddate: null,
            adult: 1,
            children: 1,
            child_status: true,
            max_adult_size: 5,
        };
    }

    render() {

        const {
            hotels,
            states,
            currentData,
            hotelDetails,
        } = this.props

        let data = {
            selectedHotel: this.state.selectedHotel,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            adult: this.state.adult,
            children: this.state.children,
            child_status: this.state.child_status,
            max_adult_size: this.state.max_adult_size,
        }

        if (currentData.data) {
            console.log("reserved hotel ->>> ", currentData.data.selectedHotel);

            data = {
                ...data,
                selectedHotel: currentData.data.selectedHotel,
                startdate: currentData.data.startdate,
                enddate: currentData.data.enddate,
                adult: currentData.data.adult,
                children: currentData.data.children,
            }

            console.log("adult ->>> ", currentData.data.adult);
            if (hotelDetails && data.selectedHotel != 0) {
                console.log("got hotel details: ", hotelDetails);

                hotelDetails.map(function (hotel, index) {
                    if (hotel.id == data.selectedHotel) {
                        console.log("children for id: " + hotel.id, hotel.child_status);
                        console.log("max adult for id: " + hotel.id, hotel.max_adult_size);
                        data = {
                            ...data,
                            child_status: hotel.child_status,
                            max_adult_size: hotel.max_adult_size,
                        };
                    }
                });
            }
        }

        if (this.state.child_status != data.child_status) {
            this.setState({ child_status: data.child_status });
            states(data);
        }

        if (this.state.max_adult_size != data.max_adult_size) {
            this.setState({ max_adult_size: data.max_adult_size });
            states(data);
        }

        return (
            <div className={styles.selective}>
                <div className={styles.selective__hotel}>
                    <FontAwesomeIcon icon={faSearch} className={styles.faicon} />
                    <select onChange={(e) => {
                        this.setState({ selectedHotel: e.target.value }, () => {
                            data = { ...data, selectedHotel: this.state.selectedHotel };
                            states(data);
                        })
                    }}>
                        <option>Rezervasyon yapmak istediğiniz oteli seçiniz.</option>
                        {hotels.map(function (hotel, index) {
                            if (hotel.id == data.selectedHotel) {
                                return <option value={hotel.id} key={index} selected>{hotel.hotel_name}</option>
                            } else {
                                return <option value={hotel.id} key={index}>{hotel.hotel_name}</option>
                            }
                        })}
                    </select>
                </div>
                <div className={styles.selective__options}>
                    <div className={styles.entry}>
                        <div className={styles.elements}>
                            <div className={styles.title}>
                                Giriş Tarihi
                            </div>
                            <div className={styles.select}>
                                <DatePicker selected={data.startdate} onChange={date => {
                                    this.setState({ startdate: date }, () => {
                                        data = { ...data, startdate: this.state.startdate }
                                        states(data);
                                    });
                                }} />
                                <FontAwesomeIcon icon={faCalendarAlt} className={styles.faicon} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.checkout}>
                        <div className={styles.elements}>
                            <div className={styles.title}>
                                Çıkış Tarihi
                            </div>
                            <div className={styles.select}>
                                <DatePicker selected={data.enddate} onChange={date => {
                                    this.setState({ enddate: date }, () => {
                                        data = { ...data, enddate: this.state.enddate }
                                        states(data);
                                    });
                                }} />
                                <FontAwesomeIcon icon={faCalendarAlt} className={styles.faicon} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.adult}>
                        <div className={styles.elements}>
                            <div className={styles.title}>
                                Yetişkin Sayısı
                            </div>
                            <div className={styles.select}>
                                <input type="number" name="adult" step="1" min="0" max={data.max_adult_size} defaultValue={data.adult} onChange={e => {
                                    this.setState({ adult: e.target.value }, () => {
                                        data = { ...data, adult: e.target.value }
                                        states(data);
                                    })
                                }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.children}>
                        <div className={styles.elements}>
                            <div className={styles.title}>
                                Çocuk Sayısı
                            </div>
                            <div className={styles.select}>
                                <input type="number" name="children" step="1" min="0" max="5" defaultValue={data.children} disabled={!data.child_status} onChange={e => {
                                    this.setState({ children: e.target.value }, () => {
                                        data = { ...data, children: this.state.children }
                                        states(data);
                                    })
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={!data.child_status ? styles.childrenAlert : styles.childrenAlert__notShowing}>
                    Çocuk ziyaretçi kabul edilmiyor!
                </div>
            </div>
        );
    }

}

Selective.propTypes = {
    hotels: PropTypes.string,
    states: PropTypes.func,
    currentData: PropTypes.string,
    hotelDetails: PropTypes.string,
}

export default Selective