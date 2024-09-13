import React, { useEffect } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addLista } from "../features/estoqueSlice";
import { salvarListasNoStorage, carregarListasDoStorage, testAsyncStorage } from "../localStorage";

function AddDashboard({ navigation }) {
    const listas = useSelector(state => state.estoque.listas);
    // const listaPendente = listas.filter(lista => lista.status === 'pendente');
    // const listafinalizada = listas.filter(lista => lista.status === 'finalizado');
    const dispatch = useDispatch();

    useEffect(() => {
        testAsyncStorage();
    }, []);

    useEffect(() => {
        if (listas.length > 0) {
            salvarListasNoStorage(listas);
        }
    }, [listas]);


    useEffect(() => {
        const fetchListas = async () => {
            const listasStorage = await carregarListasDoStorage();
            console.log('Listas carregadas do storage no fetch:', listasStorage);
            if (listasStorage.length > 0) {
                listasStorage.forEach(lista => dispatch(addLista(lista)));
            }
        };
        fetchListas();
    }, [dispatch]);


    return (

        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Lista Pendentes e Enviadas</Text>
            {listas.map(lista => (
                <View key={lista.id}>
                    {lista.status === 'pendente' ? (
                        <TouchableOpacity
                            style={styles.label}
                            onPress={() => navigation.navigate('AddItem', { listaId: lista.id, name: lista.name, status: lista.status })}
                        >
                            <Text>{lista.name}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text
                            style={styles.label}

                        >
                            {lista.name}
                        </Text>
                    )}
                </View>
            ))}
            <Button
                title="Criação de Nova Lista"
                onPress={() => {
                    navigation.navigate('AddLista');
                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default AddDashboard;