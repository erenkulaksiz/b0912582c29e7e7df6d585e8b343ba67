import React, { Component } from 'react'
import styles from './roomselective.module.scss'
import PropTypes from 'prop-types'

class RoomSelective extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            states,
            hotels,
            hotelDetails,
        } = this.props

        return (
            <div className={styles.roomselective}>
                <div className={styles.title}>
                    Oda Tipi Seçimi
                </div>
                <div className={styles.bar}></div>
            </div>
        );
    }

}

RoomSelective.propTypes = {
    states: PropTypes.string,
    hotels: PropTypes.string,
    hotelDetails: PropTypes.string,
}

export default RoomSelective