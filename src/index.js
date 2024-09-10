import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import estoqueReducer from './features/estoqueSlice';
const store = configureStore({
    reducer: {
        estoque: estoqueReducer,
    },
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
export default App;