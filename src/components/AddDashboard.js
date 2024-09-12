import React, { useEffect } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addLista } from "../features/estoqueSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

function AddDashboard({ navigation }) {
    const listas = useSelector(state => state.estoque.listas);
    // const listaPendente = listas.filter(lista => lista.status === 'pendente');
    // const listafinalizada = listas.filter(lista => lista.status === 'finalizado');
    const dispatch = useDispatch();

    const salvarListasNoStorage = async (listas) => {
        try {
            console.log('Salvando listas no armazenamento:', listas);
            await AsyncStorage.setItem('@listas', JSON.stringify(listas));
            console.log('Listas salvas com sucesso.');
        } catch (error) {
            console.error('Erro ao salvar listas', error);
        }
    };

    const carregarListasDoStorage = async () => {
        try {
            const listasString = await AsyncStorage.getItem('@listas');
            console.log('Listas carregadas do armazenamento bruto:', listasString);
            const listas = listasString ? JSON.parse(listasString) : [];
            console.log('Listas convertidas do armazenamento:', listas);
            return listas;
        } catch (error) {
            console.error('Erro ao carregar listas:', error);
            return [];
        }
    };

    const testAsyncStorage = async () => {
        await AsyncStorage.setItem('@teste', 'Testando');
        const result = await AsyncStorage.getItem('@teste');
        console.log('Valor armazenado:', result);
    };
    testAsyncStorage();

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

        <View>
            <Text>Lista Pendentes e Enviadas</Text>
            {listas.map(lista => (
                <View key={lista.id}>
                    {lista.status === 'pendente' ? (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AddItem', { listaId: lista.id, name: lista.name, status: lista.status })}
                        >
                            <Text>{lista.name}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text>{lista.name}</Text>
                    ) }
                </View>
            ))}
            <Button
                title="Criação de Nova Lista"
                onPress={() => {
                    navigation.navigate('AddLista');
                }}
            />
        </View>
    )
}

export default AddDashboard;