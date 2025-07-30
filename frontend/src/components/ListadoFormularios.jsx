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
        <div className="bg-[#fdf6d3] min-h-screen p-10 font-serif">
            <h2 className="text-3xl text-[#7e4a35] mb-6 border-b border-[bfae9b] pb-2 font-bold">
                Listado de Formularios
            </h2>
            <div className="overflow-x-auto shadow-lg rounded-lg border border-[#bfae9b] bg-white">
                <table className="min-w--full table-auto">
                    <thead className="bg-[#bfae9b] text-white">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium tracking-wide">ID</th>
                            <th className="text-left px-4 py-3 font-medium tracking-wide">Nombre</th>
                            <th className="text-left px-4 py-3 font-medium tracking-wide">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formularios.map((f) => (
                            <tr key={f.id} className="border-t border-[#eee] hover:bg-[#faf3dd]">
                                <td className="px-4 py-3 text-[#3c3c3c]">{f.id}</td>
                                <td className="px-4 py-3 text-[#3c3c3c]">{f.nombre}</td>
                                <td className="px-4 py-3 text-[#3c3c3c]">{f.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListadoFormularios;