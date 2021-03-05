import React, { Component } from 'react'
import styles from './stepper.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBed, faCreditCard } from '@fortawesome/free-solid-svg-icons';

class Stepper extends Component {

    render() {
        const {
            step
        } = this.props

        return (
            <div className={styles.stepper}>
                <div className={styles.steps}>
                    <div className={styles.step}>
                        <div className={step == 1 ? styles.icon__current : styles.icon}>
                            <FontAwesomeIcon icon={faCalendarAlt} className={styles.faicon} />
                        </div>
                        <div className={step == 1 ? styles.desc__current : styles.desc}>
                            Otel ve Tarih Seçimi
                        </div>
                    </div>
                    <div className={styles.bar}></div>
                    <div className={styles.step}>
                        <div className={step == 2 ? styles.icon__current : styles.icon}>
                            <FontAwesomeIcon icon={faBed} className={styles.faicon} />
                        </div>
                        <div className={step == 2 ? styles.desc__current : styles.desc}>
                            Oda Tipi ve Manzara Seçimi
                        </div>
                    </div>
                    <div className={styles.bar}></div>
                    <div className={styles.step}>
                        <div className={step == 3 ? styles.icon__current : styles.icon}>
                            <FontAwesomeIcon icon={faCreditCard} className={styles.faicon} />
                        </div>
                        <div className={step == 3 ? styles.desc__current : styles.desc}>
                            Önizleme ve Ödeme İşlemleri
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

Stepper.propTypes = {
    step: PropTypes.number,
}

export default Stepper