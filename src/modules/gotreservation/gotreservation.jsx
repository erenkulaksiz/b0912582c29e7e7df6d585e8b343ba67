import React, { Component } from 'react'
import styles from './gotreservation.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';

class GotReservation extends Component {

    render() {
        const {
            step
        } = this.props

        return (
            <div className={styles.stepper}>
                hey
            </div>
        );
    }

}

GotReservation.propTypes = {
    step: PropTypes.number,
}

export default GotReservation