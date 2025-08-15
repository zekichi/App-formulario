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
        const handleEliminar = async (id) => {
            const confirmar = window.confirm("¿Seguro que desea eliminar este formulario?");
            if (!confirmar) return;
            
            try {
                const res = await axios.delete(`http://localhost:5000/eliminar/${id}`);
                if (res.status === 200){
                    setFormularios(formularios.filter(f => f.id !== id));
                } else {
                    alert("No se pudo eliminar el formulario");
                }
            } catch (error) {
                console.error("Error al eliminar", error);
                alert("Error de conexión");
            }
        };
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
                        <th className="text-left px-4 py-3 font-medium tracking-wide">Mensaje</th>
                        <th className="text-left px-4 py-3 font-medium tracking-wide">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {formularios.map((f) => (
                    <tr key={f.id} className="border-t border-yellow-100 hover:bg-yellow-100">
                        <td className="px-4 py-3 text-yellow-800">{f.id}</td>
                        <td className="px-4 py-3 text-yellow-800">{f.nombre}</td>
                        <td className="px-4 py-3 text-yellow-800">{f.email}</td>
                        <td>{f.mensaje}</td>
                        <td>
                            <button
                                onClick={() => handleEliminar(f.id)}
                                className="bg-red-100 hover:bg-red-300 text-red-800 font-mono px-3 py-1 rounded shadow-sm transition-all duration-200"
                            >
                                🗑️ Eliminar
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
    );
};

export default ListadoFormularios;