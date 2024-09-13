import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLista } from "../features/estoqueSlice";
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker';

function AddLista({ navigation }) {
    const [listaNome, setListaNome] = useState('');
    const [listaData, setListaData] = useState('');
    const [listaUnidade, setListaUnidade] = useState('');
    const [listaStatus, setListaStatus] = useState('');
    const listas = useSelector(state => state.estoque.listas);
    const dispatch = useDispatch();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome da lista"
                value={listaNome}
                onChangeText={(text) => {
                    if (text.length <= 20) {
                        setListaNome(text);
                    }
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Data (DD/MM/AA)"
                value={listaData}
                keyboardType="numeric"
                onChangeText={(text) => {
                    const apenasNum = text.replace(/\D/g, '');
                    let validarData = apenasNum;
                    if (apenasNum.length > 2) {
                        validarData = `${apenasNum.slice(0, 2)}/${apenasNum.slice(2)}`
                    }
                    if (apenasNum.length > 5) {
                        validarData = `${apenasNum.slice(0, 2)}/${apenasNum.slice(2, 4)}/${apenasNum.slice(4, 6)}`
                    }
                    setListaData(validarData);
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Unidade"
                value={listaUnidade}
                keyboardType="numeric"
                onChangeText={(text) => {
                    if (text.length <= 20) {
                        setListaUnidade(text);
                    }
                }}
            />
            <Text style={styles.label}>Status</Text>
            <Picker
                selectedValue={listaStatus}
                onValueChange={(itemValue) => setListaStatus(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Selecione um status" value="" />
                <Picker.Item label="Pendente" value="pendente" />
                <Picker.Item label="Finalizado" value="finalizado" />
            </Picker>
            <Button
                title="Adicionar Lista"
                onPress={() => {
                    if (listaNome.trim() && listaData.trim() && listaUnidade.trim() && listaStatus.trim()) {
                        dispatch(addLista({
                            id: Date.now(),
                            name: listaNome,
                            data: listaData,
                            unidade: listaUnidade,
                            status: listaStatus,
                        }));
                        navigation.navigate('AddItem');
                        setListaNome('');
                        setListaData('');
                        setListaUnidade('');
                        setListaStatus('');
                    }
                }}
            />
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 15,
    },
});

export default AddLista;
