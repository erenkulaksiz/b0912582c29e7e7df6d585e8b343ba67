import React, { Component } from 'react'
import styles from './footer.module.scss'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class Footer extends Component {

    render() {
        const {
            onBack,
            onContinue,
            showBack,
            continueText,
        } = this.props

        return (
            <div className={styles.progress}>
                <div className={styles.progress__left}>
                    {showBack && <button className={styles.button} onClick={onBack}><FontAwesomeIcon icon={faChevronLeft} className={styles.faicon} />Geri</button>}
                </div>
                <div className={styles.progress__right}>
                    <button className={styles.button} onClick={onContinue}>{continueText}</button>
                </div>
            </div>
        );
    }

}

Footer.propTypes = {
    onContinue: PropTypes.func,
    onBack: PropTypes.func,
    showBack: PropTypes.bool,
    continueText: PropTypes.string,
}

export default Footer