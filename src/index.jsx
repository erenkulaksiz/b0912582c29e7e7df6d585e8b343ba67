import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.scss';
import axios from 'axios'

import { createStore } from 'redux';
import reducer from './reducers/index.js';

import styles from './styles/style.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBed, faCreditCard } from '@fortawesome/free-solid-svg-icons';

const store = createStore(reducer);

class App extends Component {

    render() {

        return (
            <div className={styles.container}>
            {console.log(styles)}
               <div className={styles.container__header}>
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
                            <button>Yeni Rezervasyon Yap</button>
                        </div>
                    </div>
               </div>
               <div className={styles.container__content}>
                    <div className={styles.stepper}>
                        <div className={styles.steps}>
                            <div className={styles.step}>
                                <div className={styles.icon__current}>
                                    <FontAwesomeIcon icon={faCalendarAlt} className={styles.faicon}/>
                                </div>
                                <div className={styles.desc__current}>
                                    Otel ve Tarih Seçimi
                                </div>
                            </div>
                            <div className={styles.bar}></div>
                            <div className={styles.step}>
                                <div className={styles.icon}>
                                    <FontAwesomeIcon icon={faBed} className={styles.faicon}/>
                                </div>
                                <div className={styles.desc}>
                                    Oda Tipi ve Manzara Seçimi
                                </div>
                            </div>
                            <div className={styles.bar}></div>
                            <div className={styles.step}>
                                <div className={styles.icon}>
                                    <FontAwesomeIcon icon={faCreditCard} className={styles.faicon}/>
                                </div>
                                <div className={styles.desc}>
                                    Önizleme ve Ödeme İşlemleri
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.choose}>
                        chose
                    </div>
               </div>
            </div>
        )
    }
}

const render = () => ReactDOM.render(
    <App />,
    document.getElementById('root')
)

render()
store.subscribe(render)

if (module.hot) {
    module.hot.accept();
}
