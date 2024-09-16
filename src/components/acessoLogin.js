import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Button, StyleSheet } from "react-native";

function AcessoLogin({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const loginTeste = (email, senha) => {
        return email === "login@usuario.com" && senha === "123456";
    };

    const ControleLogin = async () => {
        if (loginTeste(email, senha)) {
            await AsyncStorage.setItem('@login_usuario', email);
            navigation.navigate('AddDashboard');
        } else {
            alert("Login incorreto.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Senha"
                value={senha}
                secureTextEntry
                onChangeText={setSenha}
                style={styles.input}
            />
            <Button title="Login" onPress={ControleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});
export default AcessoLogin;