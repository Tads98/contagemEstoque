import { createSlice } from "@reduxjs/toolkit";

const estoqueSlice = createSlice({
    name:'estoque',
    initialState: {
        listas: [],
    },
    reducers: {
        addLista: (state, action) => {
            state.listas.push(action.payload);
        },

        atualizarLista: (state, action) =>{
            const index = state.listas.findIndex(lista => lista.id === action.payload.id);
            if (index !== -1) {
                state.listas[index] = action.payload;
            }
        },

        removerLista: (state, action) => {
            state.listas = state.listas.filter(lista => lista.id !== action.payload);
        }, 
       
        addItemLista: (state, action) => {
            const {listaId, item} = action.payload;
            const  lista = state.listas.find(lista => lista.id === listaId);
            if (lista){
               lista.itens = lista.itens || [];
               lista.itens.push(item);
            }
        },

        atualizarItemLista: (state, action) => {
            const {listaId, itemId, atualizarItem} = action.payload;
            const lista = state.listas.find(lista => lista.id === listaId);
            const index = lista.itens.findIndex(item => item.id === itemId);
            if(index !== -1){
                lista.itens[index] = {
                    ...lista.itens[index],
                    ...atualizarItem
                };
            }
        },

        removerItemLista: (state, action) => {
            const {listaId, itemId} = action.payload;
            const lista = state.listas.find(lista => lista.id === listaId);
            if (lista) {
                lista.itens = lista.itens.filter(item => item.id !== itemId);
            }
        },
        
    },
});

export const { addLista, atualizarLista, removerLista, addItemLista, atualizarItemLista, removerItemLista } = estoqueSlice.actions;

export default estoqueSlice.reducer;