import React, { useEffect, useState} from 'react';
import axios from 'axios';

const ListadoFormularios = () => {
    const [formularios, setFormularios] = useState([]);

    useEffect(() => {
        const cargarFormularios = async () => {
            try {
                const res = await axios.get('http://localhost:5000/formularios');
                setFormularios(res.data);
            } catch (error) {
                console.error('Error al cargar los formularios:', error);
            }
        };
        cargarFormularios();
    }, []);

    return (
       <div className="bg-yellow-50 min-h-screen p-10 font-serif">
            <h2 className="text-3xl text-yellow-900 mb-6 border-b border-yellow-300 pb-2 font-bold tracking-tight">
                Listado de Formularios
            </h2>

            <div className="overflow-x-auto shadow-lg rounded-lg border border-yellow-300 bg-white">
                <table className="min-w-full table-auto">
                <thead className="bg-yellow-300 text-yellow-50">
                    <tr>
                    <th className="text-left px-4 py-3 font-medium tracking-wide">ID</th>
                    <th className="text-left px-4 py-3 font-medium tracking-wide">Nombre</th>
                    <th className="text-left px-4 py-3 font-medium tracking-wide">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {formularios.map((f) => (
                    <tr key={f.id} className="border-t border-yellow-100 hover:bg-yellow-100">
                        <td className="px-4 py-3 text-yellow-800">{f.id}</td>
                        <td className="px-4 py-3 text-yellow-800">{f.nombre}</td>
                        <td className="px-4 py-3 text-yellow-800">{f.email}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
    );
};

export default ListadoFormularios;