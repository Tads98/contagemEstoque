import AsyncStorage from "@react-native-async-storage/async-storage";

export const salvaListaUsuario = async (listas) => {
    try {
        const emailUsuario = await getUsuarioLogin();
        if (emailUsuario) {
            await AsyncStorage.setItem(`login_${emailUsuario}_listas`, JSON.stringify(listas));     
        }
    } catch (error) {
        console.error("Erro ao salvar listas do usuário:", error);
    }
};

export const retornaListaUsuario = async () => {
    try {
        const emailUsuario = await getUsuarioLogin();
        if (emailUsuario) {
            const listas = await AsyncStorage.getItem(`login_${emailUsuario}_listas`);
            return listas ? JSON.parse(listas) : [];
        }
    } catch (error) {
        console.error("Erro ao retornar listas do usuário:", error);
        return [];
    }
};

export const getUsuarioLogin = async () => {
    try {
        const emailUsuario = await AsyncStorage.getItem('@login_usuario');
        return emailUsuario;
    } catch (error) {
        console.error("Erro ao obter email do usuário:", error);
    }
};

