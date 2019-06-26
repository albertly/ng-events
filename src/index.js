import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import rootReducer from './reducers'
import App from './app';
import * as serviceWorker from './serviceWorker';

import './index.css';


const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
                <Provider store={store}>
                    <Suspense fallback={<div>Loading...</div>}> 
                        <App />
                    </Suspense>
                </Provider>
                ,
                document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
