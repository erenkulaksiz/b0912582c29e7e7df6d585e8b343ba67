import React, { Component } from 'react'
import styles from './header.module.scss'
import PropTypes from 'prop-types'

class Header extends Component {

    render() {
        const {
            onButtonPress,
        } = this.props

        return (
            <div className={styles.header}>
                <div className={styles.left}>
                    <div className={styles.left__title}>
                        <div className={styles.title}>
                            Otel
                        </div>
                        <div>
                            Rezervasyon Sistemi
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.right__button}>
                        <button onClick={onButtonPress}>Yeni Rezervasyon Yap</button>
                    </div>
                </div>
            </div>
        );
    }

}

Header.propTypes = {
    onButtonPress: PropTypes.func,
}

export default Header