import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import todoApp from './redux/reducers'
let store = createStore(todoApp)
let rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
)

// ReactDOM.render(<App />, document.getElementById('root'));
 registerServiceWorker();
