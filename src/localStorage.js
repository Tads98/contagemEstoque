import AsyncStorage from '@react-native-async-storage/async-storage';

export const salvarListasNoStorage = async (listas) => {
    try {
        console.log('Salvando listas no armazenamento:', listas);
        await AsyncStorage.setItem('@listas', JSON.stringify(listas));
        console.log('Listas salvas com sucesso.');
    } catch (error) {
        console.error('Erro ao salvar listas', error);
    }
};

export const carregarListasDoStorage = async () => {
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

export const testAsyncStorage = async () => {
    await AsyncStorage.setItem('@teste', 'Testando');
    const result = await AsyncStorage.getItem('@teste');
    console.log('Valor armazenado:', result);
};