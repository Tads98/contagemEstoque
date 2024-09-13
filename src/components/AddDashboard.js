import React, { useEffect } from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
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