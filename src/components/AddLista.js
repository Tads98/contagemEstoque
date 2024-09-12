import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addLista } from "../features/estoqueSlice";
import { View, Button, TextInput } from "react-native";

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
             <TextInput
                placeholder="Status"
                value={listaStatus}
                onChangeText={setListaStatus}
            />
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
                    }
                    navigation.navigate('AddItem');
                    setListaNome('');
                    setListaData('');
                    setListaUnidade('');
                    setListaStatus('');

                }
                }
            />
        </View>
    );

}

export default AddLista;
