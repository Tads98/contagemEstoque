import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLista, atualizarLista} from "../features/estoqueSlice";
import { View, Button, TextInput } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



function AddLista({ navigation }) {
    const [listaNome, setListaNome] = useState('');
    const [listaData, setListaData] = useState('');
    const [listaUnidade, setListaUnidade] = useState('');
    const [editId, setEditId] = useState(null);
    const listas = useSelector(state => state.estoque.listas);
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
            <TextInput
                placeholder="Nome da lista"
                value={listaNome}
                onChangeText={setListaNome}
            />
            <TextInput
                placeholder="Data (DD/MM/AA)"
                value={listaData}
                onChangeText={setListaData}
            />
            <TextInput
                placeholder="Unidade"
                value={listaUnidade}
                onChangeText={setListaUnidade}
            />
            <Button
                title= "Adicionar Lista"
                onPress={() => {
                    if (listaNome.trim() && listaData.trim() && listaUnidade.trim()) {
                        if (editId) {
                            dispatch(atualizarLista({
                                id: editId,
                                name: listaNome,
                                data: listaData,
                                unidade: listaUnidade,
                            }));
                            setEditId(null);
                        } else {
                            dispatch(addLista({
                                id: Date.now(),
                                name: listaNome,
                                data: listaData,
                                unidade: listaUnidade,
                            }));
                        }
                        navigation.navigate('AddItem');
                        setListaNome('');
                        setListaData('');
                        setListaUnidade('');

                    }
                }}
            />
        </View>
    );

}

export default AddLista;
