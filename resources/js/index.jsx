/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

import './bootstrap';


/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


import React from 'react';
import ReactDOM from 'react-dom/client';

import {store} from './store/store'
import { Provider } from 'react-redux'

import App from './App';

const Index = ReactDOM.createRoot(document.getElementById("root"));


let element =
    (
        async () => {
            const response = await fetch('/api/isauth');
            const answer = await response.json();
            if (answer['auth'] === 'true')

                Index.render(
                    <React.StrictMode>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </React.StrictMode>
                )
        }
    )();

