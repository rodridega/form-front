import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
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
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>
    signIn: (user: User) => Promise<void>;
    setError: Dispatch<SetStateAction<string | undefined>>;
    setSuccess: Dispatch<SetStateAction<string>>;
    success: string;
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
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('')

    useEffect(() => {
        const localStorageData = localStorage.getItem('user')

        if (localStorageData) {
            const userLocalStorage: User = JSON.parse(localStorageData)
            setUser({
                name: userLocalStorage.name,
                number: userLocalStorage.number,
                email: userLocalStorage.email,
                userId: userLocalStorage.userId
            })
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
            setUser({
                name: '',
                number: '',
                email: '',
                userId: undefined,
            })
        }

    }, [])


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
            setIsAuthenticated(true);
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data || 'Error desconocido');
            setTimeout(() => {
                setError('')
            }, 5000);
            setIsAuthenticated(false);
        }
    };
    

    return (
        <AuthContext.Provider value={{ user, setUser, error, isAuthenticated, signIn, setError, success, setSuccess, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
