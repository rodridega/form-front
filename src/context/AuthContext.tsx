import { Dispatch, FC, ReactNode, SetStateAction, createContext, useState } from "react";
import api from "../api";

export interface User {
    name: string,
    phoneNumber: string
    email: string,
    usuarioId?: number
}

export interface AuthContextProps {
    user: User,
    setUser: Dispatch<SetStateAction<User>>,
    error: string,
    isAuthenticated: boolean,
    signIn: (user: User) => Promise<void>,
}

interface Props {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: FC<Props> = ({ children }) => {

    const [user, setUser] = useState<User>({
        name: '',
        phoneNumber: '',
        email: '',
        usuarioId: undefined
    })
    const [error, setError] = useState<string>('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)


    const signIn = async (user: User): Promise<void> => {
        if (user.email === '' || user.name === '' || user.phoneNumber === '') {
            setError('Todos los campos son obligatorios')
            return
        }
        try {
            const response = await api.post('/registrar-usuario', user)
            localStorage.setItem('user', JSON.stringify({ ...user, usuarioId: response?.data?.usuarioId }));
            setUser((prevState) => {
                return {
                    ...prevState,
                    usuarioId: response?.data?.usuarioId
                }
            })
            console.log(response);
            setIsAuthenticated(true)
        } catch (error) {
            console.error(error);
            setError(error.response?.data || 'Error desconocido')
            setIsAuthenticated(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, setUser, error, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}
