import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarListasNoStorage = async (listas) => {
    try {
        console.log('Salvando listas:', listas);
        await AsyncStorage.setItem('@listas', JSON.stringify(listas));
        console.log('Listas salvas com sucesso.');
    } catch (error) {
        console.error('Erro ao salvar listas', error);
    }
};

export const carregarListasDoStorage = async () => {
    try {
        const listasString = await AsyncStorage.getItem('@listas');
        console.log('Listas carregadas:', listasString);
        const listas = listasString ? JSON.parse(listasString) : [];
        console.log('Listas convertidas:', listas);
        return listas;
    } catch (error) {
        console.error('Erro ao carregar listas:', error);
        return [];
    }
};

export const testAsyncStorage = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();  
        const items = await AsyncStorage.multiGet(keys);  
        console.log('Itens armazenados no AsyncStorage:', items);  
    } catch (error) {
        console.error('Erro ao listar AsyncStorage:', error);
    }
};