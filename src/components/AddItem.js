import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { atualizarLista, addItemLista, atualizarItemLista, removerItemLista, removerLista } from "../features/estoqueSlice";
import { View, Button, TextInput, Text } from "react-native";

function AddItem({ route }) {
    const { name } = route.params;
    const [listaNome, setListaNome] = useState('');
    const [itemNome, setItemNome] = useState('');
    const [listaData, setListaData] = useState('');
    const [listaUnidade, setListaUnidade] = useState('');
    const [codigoBarras, setcodigoBarras] = useState('');
    const [dataValidade, setdataValidade] = useState('');
    const [qtdEmbalagem, setqtdEmbalagem] = useState('');
    const [qtdTotal, setqtdTotal] = useState('');
    const [editId, setEditId] = useState(null);
    const [itemEditId, setItemEditId] = useState(null);
    const listas = useSelector(state => state.estoque.listas);
    const dispatch = useDispatch();

    return (
        <View>
             <Text>{name}</Text>
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
                title= "Atualizar lista"
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
                        }
                        setListaNome('');
                        setListaData('');
                        setListaUnidade('');

                    }
                }}
            />
            {listas.map(lista => (
                <View key={lista.id}>
                    <Text>Nome: {lista.name}</Text>
                    <Text>Data: {lista.data}</Text>
                    <Text>Unidade: {lista.unidade}</Text>

                    <TextInput
                        placeholder="Nome do item"
                        value={itemNome}
                        onChangeText={setItemNome}
                    />

                    <TextInput
                        placeholder="Código de barras"
                        value={codigoBarras}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const numericCode = text.replace(/[^0-9]/g, '');
                            setcodigoBarras(numericCode);
                        }}
                    />
                    <TextInput
                        placeholder="Data de Validade"
                        value={dataValidade}
                        onChangeText={setdataValidade}
                    />
                    <TextInput
                        placeholder="Unidade por Embalagem"
                        value={qtdEmbalagem}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const validarQtd = text.replace(/[^0-9]/g, '');
                            setqtdEmbalagem(validarQtd);
                        }}
                    />
                    <TextInput
                        placeholder="Quantidade Total"
                        value={qtdTotal}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                            const validarQtdTotal = text.replace(/[^0-9]/g, '');
                            setqtdTotal(validarQtdTotal);
                        }}
                    />
                    <Button
                        title={itemEditId ? "Atualizar Item" : "Adicionar Item"}
                        onPress={() => {
                            if (itemNome.trim() && codigoBarras.trim() && dataValidade.trim() && qtdEmbalagem.trim() && qtdTotal.trim()) {
                                if (itemEditId) {
                                    dispatch(atualizarItemLista({
                                        listaId: lista.id,
                                        itemId: itemEditId,
                                        atualizarItem: {
                                            name: itemNome,
                                            codigoBarras: codigoBarras,
                                            dataValidade: dataValidade,
                                            qtdEmbalagem: parseInt(qtdEmbalagem),
                                            qtdTotal: parseInt(qtdTotal)
                                        }
                                    }));
                                    setItemEditId(null);
                                } else {
                                    dispatch(addItemLista({
                                        listaId: lista.id,
                                        item: {
                                            id: Date.now(),
                                            name: itemNome,
                                            codigoBarras: codigoBarras,
                                            dataValidade: dataValidade,
                                            qtdEmbalagem: parseInt(qtdEmbalagem),
                                            qtdTotal: parseInt(qtdTotal)
                                        }
                                    }));
                                }

                                setItemNome('');
                                setcodigoBarras('');
                                setdataValidade('');
                                setqtdEmbalagem('');
                                setqtdTotal('');
                            }
                        }}
                    />

                    {lista.itens && lista.itens.map(item => (
                        <View key={item.id}>
                            <Text>Item: {item.name}</Text>
                            <Text>Código de Barras: {item.codigoBarras}</Text>
                            <Text>Data de Validade: {item.dataValidade}</Text>
                            <Text>Quantidade Embalagem: {item.qtdEmbalagem}</Text>
                            <Text>Quantidade Total: {item.qtdTotal}</Text>
                            <Button
                                title="Editar Item"
                                onPress={() => {
                                    setItemEditId(item.id);
                                    setItemNome(item.name);
                                    setcodigoBarras(item.codigoBarras);
                                    setdataValidade(item.dataValidade);
                                    setqtdEmbalagem(item.qtdEmbalagem.toString());
                                    setqtdTotal(item.qtdTotal.toString());
                                }}
                            />
                            <Button
                                title="Remover Item"
                                onPress={() => dispatch(removerItemLista({ listaId: lista.id, itemId: item.id }))}
                            />
                        </View>
                    ))}
                                        
                    <Button
                        title="Editar Lista"
                        onPress={() => {
                            setEditId(lista.id);
                            setListaNome(lista.name);
                            setListaData(lista.data);
                            setListaUnidade(lista.unidade);
                        }}
                    />
                    

                    <Button
                        title="Remover Lista"
                        onPress={() => dispatch(removerLista(lista.id))}
                    />
                </View>
            ))}
        </View>
    );
}

export default AddItem;