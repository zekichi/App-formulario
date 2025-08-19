import { useState } from 'react';

type FormData = {
    nombre: string;
    email: string;
    mensaje: string;
};

export default function Formulario() {
    const [formData, setFormData] = useState<FormData>({
        nombre: '',
        email: '',
        mensaje: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Datos enviados:', formData);
        // Para agregar lógica de envío, aquí
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-blanco border border-borde rounded-lg shadow-sm space-y-4 font-serif"
        >
            <h2 className="text-2xl text-acento mb-4">Formulario de contacto</h2>

            <div>
                <label className="block text-sm mb-1 text-texto" htmlFor="nombre">Nombre</label>
                <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2 border border-borde rounded bg-fondo text-texto"
                required
                />
            </div>

            <div>
                <label className="block text-sm mb-1 text-texto" htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-borde rounded bg-fondo text-texto"
                    required
                />
            </div>

            <div>
                <label className="block text-sm mb-1 text-texto" htmlFor="mensaje">Mensaje</label>
                <textarea
                    name="mensaje"
                    id="mensaje"
                    rows={4}
                    value={formData.mensaje}
                    onChange={handleChange}
                    className="w-full p-2 border border-borde rounded bg-fondo text-texto"
                    required
                />
            </div>

            <button
                type="submit"
                className="bg-acento text-blanco px-4 py-2 rounded hover:opacity-90 transition"
            >
                Enviar
            </button>
        </form>

    );
}