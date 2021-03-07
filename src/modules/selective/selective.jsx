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
            startdate: new Date(),
            enddate: new Date(),
            adult: 1,
            children: 1,
        };
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {

        const {
            hotels,
            states,
            currentData,
        } = this.props

        let data = {
            selectedHotel: this.state.selectedHotel,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            adult: this.state.adult,
            children: this.state.children,
        }

        if (currentData.data) {
            console.log("reserved hotel ->>> ", currentData.data.selectedHotel);
            data.selectedHotel = currentData.data.selectedHotel;
            data.startdate = currentData.data.startdate;
            data.enddate = currentData.data.enddate;
            data.adult = currentData.data.adult;
            data.children = currentData.data.children;
            console.log("adult ->>> ", currentData.data.adult);
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
                                <input type="number" name="adult" step="1" defaultValue={data.adult} onChange={e =>
                                    this.setState({ adult: e.target.value }, () => {
                                        data = { ...data, adult: this.state.adult }
                                        states(data);
                                    })}
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
                                <input type="number" name="children" step="1" defaultValue={data.children} onChange={e =>
                                    this.setState({ children: e.target.value }, () => {
                                        data = { ...data, children: this.state.children }
                                        states(data);
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Selective.propTypes = {
    hotels: PropTypes.string,
    states: PropTypes.func,
    currentData: PropTypes.string,
}

export default Selective