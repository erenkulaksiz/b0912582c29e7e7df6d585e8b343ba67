import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/globals.scss';
import axios from 'axios'

import { createStore } from 'redux';
import reducer from './reducers/index.js';

//import styles from './styles/reservation.module.scss';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faHeartbeat, faCheckCircle, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const store = createStore(reducer);

class App extends Component {

    render() {

        return (
            <div>
                hey.
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
