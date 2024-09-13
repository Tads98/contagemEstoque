import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLista } from "../features/estoqueSlice";
import { View, Button, TextInput, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';

function AddLista({ navigation }) {
    const [listaNome, setListaNome] = useState('');
    const [listaData, setListaData] = useState('');
    const [listaUnidade, setListaUnidade] = useState('');
    const [listaStatus, setListaStatus] = useState('');
    const listas = useSelector(state => state.estoque.listas);
    const dispatch = useDispatch();

    return (
        <View>
            <TextInput
                placeholder="Nome da lista"
                value={listaNome}
                onChangeText={(text) => {
                    if (text.length <= 20) {
                        setListaNome(text);
                    }
                }}
            />
            <TextInput
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
                placeholder="Unidade"
                value={listaUnidade}
                keyboardType="numeric"
                onChangeText={(text) => {
                    if (text.length <= 20) {
                        setListaUnidade(text);
                    }
                }}
            />

            <Text>Status</Text>
            <Picker
                selectedValue={listaStatus}
                onValueChange={(itemValue) => setListaStatus(itemValue)}
                style={{ height: 50, width: '100%' }}
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
                    } else {
                        return;
                    }
                }}
            />

        </View>
    );

}

export default AddLista;
