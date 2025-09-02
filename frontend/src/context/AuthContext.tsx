import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>; // Cambiar retorno a void
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [token, setToken] = useState<string | null>(null);  // Inicializar como null
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        headers: { Authorization: token ? `Bearer ${token}` : '' },
    });

    const register = async (email: string, password: string): Promise<void> => {
        try {
            const response = await api.post('/auth/register', { email, password });
            if (response.status !== 201) {
                throw new Error('Error en el registro');
            }
            // No retornamos nada, solo navegamos
            navigate('/login');
        } catch (error) {
            console.error('Error de registro:', error);
            throw error;
        }
    };

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al iniciar sesión');
            }

            localStorage.setItem('token', data.access_token);
            setToken(data.access_token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error de login:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
    };

    useEffect(() => {
        // Verificar token al inicio
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        setLoading(false);
    }, []);

    // Si está cargando, mostrar un indicador visual más claro
    if (loading) {
        return (
            <div className="min-h-screen bg-fondo flex items-center justify-center">
                <div className="text-acento text-xl">Cargando...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);