import React, { Component } from 'react'
import styles from './hotelselective.module.scss'
import PropTypes from 'prop-types'

class HotelSelective extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            states,
            hotels,
            hotelDetails,
            child,
        } = this.props

        return (
            <div className={styles.hotelselective}>
                <div className={styles.details}>
                    <div className={styles.details__title}>
                        <div className={styles.title}>
                            {hotels[states.data.selectedHotel - 1].hotel_name}
                        </div>
                        <div className={styles.location}>
                            {hotelDetails.map(function (detail, index) {
                                if (detail.id == states.data.selectedHotel) {
                                    return <div>({detail.city})</div>;
                                }
                            })}
                        </div>
                    </div>
                    <div className={styles.desc}>
                        <div className={styles.startdate}>
                            <b>Giriş Tarihi:</b> {states.data.startdate.getDate() + "." + (states.data.startdate.getMonth() + 1) + "." + states.data.startdate.getFullYear()}
                        </div>
                        •
                        <div className={styles.enddate}>
                            <b>Çıkış Tarihi:</b> {states.data.enddate.getDate() + "." + (states.data.enddate.getMonth() + 1) + "." + states.data.enddate.getFullYear()}
                        </div>
                        •
                        <div className={styles.adult}>
                            <b>Yetişkin:</b> {states.data.adult}
                        </div>

                        {child &&
                            <>•<div className={styles.children}>
                                <b>Çocuk:</b> {states.data.children}
                            </div></>
                        }

                    </div>
                </div>
            </div>
        );
    }

}

HotelSelective.propTypes = {
    states: PropTypes.string,
    hotels: PropTypes.string,
    hotelDetails: PropTypes.string,
    child: PropTypes.string,
}

export default HotelSelective