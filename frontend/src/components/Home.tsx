// src/components/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="min-h-screen bg-fondo font-serif text-texto flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl mb-4 text-acento">Bienvenido a la aplicación de formularios</h1>
            <p className="max-w-lg text-center mb-8">
                Crea encuestas personalizadas y recopila respuestas de manera eficiente.
            </p>
            <div className="space-x-4">
                <Link
                    to="/register"
                    className="px-6 py-2 bg-acento text-blanco rounded hover:opacity-90 transition"
                >
                    Crear cuenta
                </Link>
                <Link
                    to="/login"
                    className="px-6 py-2 border-2 border-acento text-acento rounded hover:bg-acento hover:text-blanco transition"
                >
                    Iniciar sesión
                </Link>
            </div>
        </div>
    );
}