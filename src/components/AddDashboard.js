import React, { useEffect } from "react";
import { Button, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addLista } from "../features/estoqueSlice";
import { salvarListasNoStorage, carregarListasDoStorage, testAsyncStorage } from "../localStorage";
import { salvaListaUsuario, retornaListaUsuario } from "../utils/ServicoLista";

function AddDashboard({ navigation }) {
    const listas = useSelector(state => state.estoque.listas);
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

            const listasUsuario = await retornaListaUsuario();
            listasUsuario.forEach(lista => dispatch(addLista(lista)));
        };
        fetchListas();
    }, [dispatch]);

    const mockApiSync = (listas) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("listas sincronizadas: ", listas);
                resolve({ status: 'sucesso', data: listas});
            }, 1000);
        });
    };

    const syncListas = async () => {
        const listasUsuario = await retornaListaUsuario();
        const response = await mockApiSync(listasUsuario);
        if (response.status === 'sucesso') {
            alert('Sincronização concluida');
            await salvaListaUsuario(response.data);
        }
    };

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

            <Button title="Sincronizar Listas" onPress={syncListas}/>
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