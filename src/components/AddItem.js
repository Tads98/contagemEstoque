import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { atualizarLista, addItemLista, atualizarItemLista, removerItemLista, removerLista } from "../features/estoqueSlice";
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from "react-native";

function AddItem({ route }) {
    const listaId = route.params?.listaId;
    const [listaNome, setListaNome] = useState('');
    const [itemNome, setItemNome] = useState('');
    const [listaData, setListaData] = useState('');
    const [listaUnidade, setListaUnidade] = useState('');
    const [codigoBarras, setcodigoBarras] = useState('');
    const [dataValidade, setdataValidade] = useState('');
    const [qtdEmbalagem, setqtdEmbalagem] = useState('');
    const [listaStatus, setListaStatus] = useState('');
    const [qtdTotal, setqtdTotal] = useState('');
    const [editId, setEditId] = useState(null);
    const [editarLista, setEditarLista] = useState(false);
    const [editarItem, setEditarItem] = useState(false);
    const [itemEditId, setItemEditId] = useState(null);
    const listas = useSelector(state => state.estoque.listas);
    const dispatch = useDispatch();

    const lista = listaId ? listas.find(lista => lista.id === listaId) : null;

    useEffect(() => {
        if (lista) {
            setListaNome(lista.name);
            setListaData(lista.data);
            setListaUnidade(lista.unidade);
            setListaStatus(lista.status);
        } else {
            setListaNome('');
            setListaData('');
            setListaUnidade('');
            setListaStatus('');
        }
    }, [lista]);



    return (
        <ScrollView contentContainerStyle={styles.container}>
            {editarLista && (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da lista"
                        value={listaNome}
                        onChangeText={setListaNome}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Data (DD/MM/AA)"
                        value={listaData}
                        onChangeText={setListaData}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Unidade"
                        value={listaUnidade}
                        onChangeText={setListaUnidade}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Status"
                        value={listaStatus}
                        onChangeText={setListaStatus}
                    />

                    <Button
                        title="Atualizar lista"
                        onPress={() => {
                            if (listaNome.trim() && listaData.trim() && listaUnidade.trim()) {
                                if (editId) {
                                    dispatch(atualizarLista({
                                        id: editId,
                                        name: listaNome,
                                        data: listaData,
                                        unidade: listaUnidade,
                                        status: listaStatus,
                                    }));
                                    setEditId(null);
                                }
                                setListaNome('');
                                setListaData('');
                                setListaUnidade('');
                                setListaStatus('');
                                setEditarLista(false);
                            }
                        }}
                        style={styles.button}
                    />
                </>
            )}

            <Button
                title={editarLista ? "Cancelar Edição" : "Editar Lista"}
                onPress={() => {
                    setEditarLista(!editarLista);
                    if (!editarLista && lista) {
                        setEditId(lista.id);
                        setListaNome(lista.name);
                        setListaData(lista.data);
                        setListaUnidade(lista.unidade);
                        setListaStatus(lista.status);
                    }
                }}
                style={styles.button}
            />

            {listas.map(lista => (
                <View key={lista.id} style={styles.section}>
                    <Text style={styles.input}>Nome: {lista.name}</Text>
                    <Text style={styles.input}>Data: {lista.data}</Text>
                    <Text style={styles.input}>Unidade: {lista.unidade}</Text>
                    <Text style={styles.input}>Status: {lista.status}</Text>
                    {editarItem && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome do item"
                                value={itemNome}
                                onChangeText={setItemNome}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Código de barras"
                                value={codigoBarras}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    const numericCode = text.replace(/[^0-9]/g, '');
                                    setcodigoBarras(numericCode);
                                }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Data de Validade"
                                value={dataValidade}
                                onChangeText={setdataValidade}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Unidade por Embalagem"
                                value={qtdEmbalagem}
                                keyboardType="numeric"
                                onChangeText={(text) => {
                                    const validarQtd = text.replace(/[^0-9]/g, '');
                                    setqtdEmbalagem(validarQtd);
                                }}
                            />
                            <TextInput
                                style={styles.input}
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
                                        setEditarItem(false);
                                    }
                                }}
                                style={styles.button}
                            />
                        </>
                    )}

                    <Button 
                        title={editarItem ? "Cacelar Adição" : "Adicionar Item"}
                        onPress={() =>{
                            setEditarItem(!editarItem);
                        }}
                        style={styles.button}
                    />

                    {lista.itens && lista.itens.map(item => (
                        <View key={item.id} style={styles.section}>
                            <Text style={styles.input}>Item: {item.name}</Text>
                            <Text style={styles.input}>Código de Barras: {item.codigoBarras}</Text>
                            <Text style={styles.input}>Data de Validade: {item.dataValidade}</Text>
                            <Text style={styles.input}>Quantidade Embalagem: {item.qtdEmbalagem}</Text>
                            <Text style={styles.input}>Quantidade Total: {item.qtdTotal}</Text>
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
                                style={styles.button}
                            />
                            <Button
                                title="Remover Item"
                                onPress={() => dispatch(removerItemLista({ listaId: lista.id, itemId: item.id }))}
                                style={styles.button}
                            />
                        </View>
                    ))}

                    <Button
                        title="Remover Lista"
                        onPress={() => dispatch(removerLista(lista.id))}
                        style={styles.button}
                    />
                </View>
            ))}
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
        marginBottom: 20, 
        marginTop: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 15,
        marginBottom: 20, 
    },
    section: {
        marginBottom: 40,
    },
});


export default AddItem;