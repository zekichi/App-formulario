// src/components/Dashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

type Formulario = {
    id: number;
    nombre: string;
    email: string;
    mensaje: string;
    fecha_envio: string;
};

export default function Dashboard() {
    const { token, logout } = useAuth();
    const [formularios, setFormularios] = useState<Formulario[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/forms`, {
            headers:{
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => res.json())
        .then(setFormularios)
        .catch(() => setFormularios([]));
    }, [token]);

    return (
        <div className="min-h-screen bg-fondo font-serif text-texto p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl text-acento">Tus formularios</h2>
                <button onClick={logout} className="text-sm text-acento underline">
                    Cerrar sesión
                </button>
            </div>

            <Link
                to="/forms/new"
                className="inline-block mb-4 px-4 py-2 bg-acento text-blanco rounded hover:opacity-90 transition"
            >
                Crear nuevo Formulario
            </Link>

            <ul className="space-y-4">
                {formularios.map((f) =>
                    <li key={f.id} className="border border-borde p-4 rounded bg-blanco shadow-sm">
                        <h3 className="text-lg font-semibold">{f.nombre}</h3>
                        <p className="text-sm opacity-80">{f.email}</p>
                        <p className="text-sm mt-2">{f.mensaje}</p>
                        <p className="text-sm mt-1 text-right text-texto">{f.fecha_envio}</p>
                        <button
                            onClick={() => {
                                fetch(`${import.meta.env.VITE_API_URL}/forms/${f.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                        },
                            }).then(() => {
                                setFormularios((prev) => prev.filter((items) => items.id !== f.id));
                            });
                            }}
                        >
                            Eliminar
                        </button>
                    </li>
                )}
            </ul>
           
        </div>
    );
}