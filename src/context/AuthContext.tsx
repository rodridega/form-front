import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import api from "../api";

export interface User {
    name: string;
    number: string;
    email: string;
    userId?: number;
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
        name: '',
        number: '',
        email: '',
        userId: undefined,
    });
    const [error, setError] = useState<string | undefined>('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = async (user: User): Promise<void> => {
        if (user.email === '' || user.name === '' || user.number === '') {
            setError('Todos los campos son obligatorios');
            return;
        }
        try {
            const response = await api.post('/register', user);
            localStorage.setItem('user', JSON.stringify({ ...user, userId: response?.data?.userId }));
            setUser((prevState) => {
                return {
                    ...prevState,
                    userId: response?.data?.userId,
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
