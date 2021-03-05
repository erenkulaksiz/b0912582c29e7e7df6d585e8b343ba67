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
            selectedHotel: null,
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
        } = this.props

        let data = {
            selectedHotel: this.state.selectedHotel,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            adult: this.state.adult,
            children: this.state.children,
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
                        <option selected value='null'>Rezervasyon yapmak istediğiniz oteli seçiniz.</option>
                        {hotels.map(function (hotel, index) { return <option value={hotel.id} key={index}>{hotel.hotel_name}</option> })}
                    </select>
                </div>
                <div className={styles.selective__options}>
                    <div className={styles.entry}>
                        <div className={styles.elements}>
                            <div className={styles.title}>
                                Giriş Tarihi
                            </div>
                            <div className={styles.select}>
                                <DatePicker selected={this.state.startdate} onChange={date => { this.setState({ startdate: date }); states(data); }} />
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
                                <DatePicker selected={this.state.enddate} onChange={date => { this.setState({ enddate: date }); states(data); }} />
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
                                <input type="number" name="adult" step="1" defaultValue="1" onChange={(e) => { this.handleChange(e); states(data) }} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.children}>
                        <div className={styles.elements}>
                            <div className={styles.title}>
                                Çocuk Sayısı
                            </div>
                            <div className={styles.select}>
                                <input type="number" name="children" step="1" defaultValue="1" onChange={(e) => { this.handleChange(e); states(data) }} />
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

}

export default Selective