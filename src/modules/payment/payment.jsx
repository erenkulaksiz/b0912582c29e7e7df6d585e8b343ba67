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

    render() {

        const { name, number, expiryDate, expiryYear, cvc, focused } = this.state;

        const {
            paymentDetails,
            currentPaymentDetails,
        } = this.props

        const expiryDates = [];
        const expiryYears = [];

        let data = {
            name: this.state.name,
            number: this.state.number,
            expiryDate: this.state.expiryDate,
            expiryYear: this.state.expiryYear,
            cvc: this.state.cvc
        }

        if (currentPaymentDetails) {
            console.log("current payment details: ", currentPaymentDetails);
            data = {
                name: currentPaymentDetails.name,
                number: currentPaymentDetails.number,
                expiryDate: currentPaymentDetails.expiryDate,
                expiryYear: currentPaymentDetails.expiryYear,
                cvc: currentPaymentDetails.cvc,
            }
        }

        for (let i = 1; i <= 12; i++) {
            expiryDates.push(<option value={i}>{i}</option>)
        }
        for (let i = 2021; i <= 2040; i++) {
            expiryYears.push(<option value={i}>{i}</option>)
        }

        const handleCallback = ({ issuer }, isValid) => {
            if (isValid) {
                this.setState({ issuer });
            }
        };

        const handleInputFocus = (target) => {
            this.setState({
                focused: target.name
            });
        };

        const handleInputChange = (target) => {
            if (target.name === "number") {
                target.value = formatCreditCardNumber(target.value);
            } else if (target.name === "expiry") {
                target.value = formatExpirationDate(target.value);
            } else if (target.name === "cvc") {
                target.value = formatCVC(target.value);
            }
            this.setState({ [target.name]: target.value }, () => {
                data = { ...data, [target.name]: target.value };
                paymentDetails(data);
            });

        };

        //
        // !!!!!
        // cardda state yerine data kullan;

        return (
            <div className={styles.payment}>
                <div className={styles.card}>
                    <Card
                        number={data.number}
                        name={data.name}
                        expiry={data.expiryYear + "/" + data.expiryDate}
                        cvc={data.cvc}
                        focused={focused}
                        callback={handleCallback}
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
                                defaultValue={data.name}
                                required
                                onChange={(e) => {
                                    handleInputChange(e.target);
                                }}
                                onFocus={(e) => { handleInputFocus(e.target) }}
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
                                defaultValue={data.number}
                                pattern="[\d| ]{16,22}"
                                required
                                onChange={(e) => {
                                    handleInputChange(e.target);
                                }}
                                onFocus={(e) => { handleInputFocus(e.target); }}
                            />
                        </div>
                    </div>
                    <div className={styles.form__ccv}>
                        <div className={styles.date}>
                            <div className={styles.title}>
                                Kart Son Kullanma Tarihi
                            </div>
                            <div className={styles.input}>
                                <select name="expiryDate"
                                    defaultValue={data.expiryDate}
                                    onChange={(e) => {
                                        handleInputChange(e.target);
                                    }}
                                    onFocus={(e) => { handleInputFocus(e.target); }}>
                                    <option>Ay</option>
                                    {expiryDates}
                                </select>
                                <select name="expiryYear"
                                    defaultValue={data.expiryYear}
                                    onChange={(e) => {
                                        handleInputChange(e.target);
                                    }}
                                    onFocus={(e) => { handleInputFocus(e.target); }}>
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
                                    defaultValue={data.ccv}
                                    pattern="\d{3,4}"
                                    required
                                    onChange={(e) => {
                                        handleInputChange(e.target);
                                    }}
                                    onFocus={(e) => { handleInputFocus(e.target) }}
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
    currentPaymentDetails: PropTypes.string,
}

export default Payment