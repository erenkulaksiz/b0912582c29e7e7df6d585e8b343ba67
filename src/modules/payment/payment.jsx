import React, { Component } from 'react'
import styles from './payment.module.scss'
import PropTypes from 'prop-types'
import Card from "react-credit-cards";

import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            number: "",
            name: "",
            expiryDate: "",
            expiryYear: "",
            cvc: "",
            issuer: "",
            focused: "",
            formData: null
        };
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            this.setState({ issuer });
        }
    };

    handleInputFocus = ({ target }) => {
        this.setState({
            focused: target.name
        });
    };

    handleInputChange = ({ target }) => {
        if (target.name === "number") {
            target.value = formatCreditCardNumber(target.value);
        } else if (target.name === "expiry") {
            target.value = formatExpirationDate(target.value);
        } else if (target.name === "cvc") {
            target.value = formatCVC(target.value);
        }

        this.setState({ [target.name]: target.value });
    };


    render() {

        const { name, number, expiryDate, expiryYear, cvc, focused } = this.state;

        const {
            paymentDetails,
        } = this.props

        paymentDetails(this.state);

        const expiryDates = [];
        const expiryYears = [];

        for (let i = 1; i <= 12; i++) {
            expiryDates.push(<option value={i}>{i}</option>)
        }
        for (let i = 2021; i <= 2040; i++) {
            expiryYears.push(<option value={i}>{i}</option>)
        }

        return (
            <div className={styles.payment}>
                <div className={styles.card}>
                    <Card
                        number={number}
                        name={name}
                        expiry={expiryYear + "/" + expiryDate}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                    />
                </div>
                <div className={styles.form}>
                    <div className={styles.formTitle}>
                        Kredi Kartı Bilgileri
                    </div>
                    <div className={styles.form__name}>
                        <div className={styles.title}>
                            Kart Üzerindeki İsim
                        </div>
                        <div className={styles.input}>
                            <input
                                type="tel"
                                name="name"
                                className="form-control"
                                placeholder="Kartın Üzerindeki İsmi Giriniz"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                    </div>
                    <div className={styles.form__card}>
                        <div className={styles.title}>
                            Kart Numarası
                        </div>
                        <div className={styles.input}>
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Kart Numarasını Giriniz"
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={this.handleInputChange}
                                onFocus={this.handleInputFocus}
                            />
                        </div>
                    </div>
                    <div className={styles.form__ccv}>
                        <div className={styles.date}>
                            <div className={styles.title}>
                                Kart Son Kullanma Tarihi
                            </div>
                            <div className={styles.input}>
                                <select name="expiryDate" onChange={this.handleInputChange} onFocus={this.handleInputFocus}>
                                    <option>Ay</option>
                                    {expiryDates}
                                </select>
                                <select name="expiryYear" onChange={this.handleInputChange} onFocus={this.handleInputFocus}>
                                    <option>Yıl</option>
                                    {expiryYears}
                                </select>
                            </div>
                        </div>
                        <div className={styles.ccv}>
                            <div className={styles.title}>
                                CCV
                            </div>
                            <div className={styles.input}>
                                <input
                                    type="tel"
                                    name="cvc"
                                    className="form-control"
                                    placeholder="CCV Giriniz"
                                    pattern="\d{3,4}"
                                    required
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }

}

Payment.propTypes = {
    paymentDetails: PropTypes.func,
}

export default Payment