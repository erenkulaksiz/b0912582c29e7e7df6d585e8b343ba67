import React, { Component } from 'react'
import styles from './gotreservation.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

class GotReservation extends Component {

    render() {
        const {
            onNew,
            onUpdate,
            onCancel,
        } = this.props

        return (
            <div className={styles.reservationWrapper}>
                <div className={styles.success}>
                    <FontAwesomeIcon icon={faCalendarCheck} className={styles.faicon} />
                    <div className={styles.title}>Rezervasyon Kaydınız alınmıştır.</div>
                    <div className={styles.desc}>Rezervasyon özetiniz aşağıdaki gibidir. Rezervasyon kaydınızda değişiklik veya yeni rezervasyon yapmak için aşağıdaki linkleri kullanabilirsiniz.</div>
                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={onNew}>Yeni Rezervasyon Yap</button>
                        <button className={styles.button} onClick={onUpdate}>Rezervasyonu Güncelle</button>
                        <button className={styles.button} onClick={onCancel}>Rezervasyonu İptal Et</button>
                    </div>
                </div>
            </div>
        );
    }

}

GotReservation.propTypes = {
    onNew: PropTypes.func,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func,
}

export default GotReservation