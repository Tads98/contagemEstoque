import React from 'react';
import ReactDOM from "react-dom";
import App from './App';
import { View,Text } from 'react-native';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import estoqueReducer from './features/estoqueSlice';

const store = configureStore({
    reducer: {
        estoque: estoqueReducer,
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <View>
                <Text>Contagem Estoque</Text>
                <App />
            </View>
        </Provider>
    </React.StrictMode>,
    document.getElementById("root")
);
export default App;