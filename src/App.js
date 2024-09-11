import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddLista from "./components/AddLista";
import AddItem from "./components/AddItem";
import AddDashboard from "./components/AddDashboard";

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="AddDashboard">
                <Stack.Screen name="AddDashboard" component={AddDashboard} options={{ title: 'Dashboard' }} />
                <Stack.Screen name="AddLista" component={AddLista} options={{ title: 'Criação de Lista de Auditoria' }} />
                <Stack.Screen name="AddItem" component={AddItem} options={{ title: 'Adição de Itens à Lista de Auditoria' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App; 