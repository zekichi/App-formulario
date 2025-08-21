import { createContext, useContext, useState } from "react";
import axios from 'axios';

type AuthContextData = {
    token: string | null;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }){
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token')
    );

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: { Authorization: token ? `Bearer ${token}` : '' },
    });

    const register = async (email: string, password: string) => {
        await api.post('/auth/register', { email, password });
    };

    const login = async (email: string, password: string) => {
        const { data } = await api.post('/auth/login', { email, password });
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);