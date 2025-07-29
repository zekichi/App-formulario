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
        <div>
            <h2>Listado de Formularios</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {formularios.map((f) => (
                        <tr key={f.id}>
                            <td>{f.id}</td>
                            <td>{f.nombre}</td>
                            <td>{f.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoFormularios;