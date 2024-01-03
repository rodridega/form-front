import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import api from "../api";

export interface User {
    nombre: string;
    telefono: string;
    correo: string;
    usuarioId?: number;
}

export interface AuthContextProps {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    error: string | undefined;
    isAuthenticated: boolean;
    signIn: (user: User) => Promise<void>;
}

interface Props {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User>({
        nombre: '',
        telefono: '',
        correo: '',
        usuarioId: undefined,
    });
    const [error, setError] = useState<string | undefined>('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = async (user: User): Promise<void> => {
        if (user.correo === '' || user.nombre === '' || user.telefono === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            const response = await api.post('/registrar-usuario', user);
            localStorage.setItem('user', JSON.stringify({ ...user, usuarioId: response?.data?.usuarioId }));
            setUser((prevState) => {
                return {
                    ...prevState,
                    usuarioId: response?.data?.usuarioId,
                };
            });
            console.log(response);
            setIsAuthenticated(true);
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data || 'Error desconocido');
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, error, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
