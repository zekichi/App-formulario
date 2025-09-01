// src/components/NewForm.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// Esquema de validación para el formulario principal
const schema = Yup.object().shape({
    nombre: Yup.string().required('Requerido'),
    email: Yup.string().email('Email inválido').required('Requerido'),
    mensaje: Yup.string(),
});

// Tipo para las preguntas
type Pregunta = {
    texto: string;
    tipo: 'texto' | 'checkbox' | 'radio';
    opciones: string[];
};

export default function NewForm() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [nuevaOpcion, setNuevaOpcion] = useState('');

    // Agregar una nueva pregunta al formulario
    const agregarPregunta = () => {
        setPreguntas([...preguntas, { texto: '', tipo: 'texto', opciones: [] }]);
    };

    // Eliminar una pregunta específica
    const eliminarPregunta = (index: number) => {
        setPreguntas(preguntas.filter((_, i) => i !== index));
    };

    // Actualizar los campos de una pregunta
    const actualizarPregunta = (index: number, campo: keyof Pregunta, valor: string) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index] = { 
            ...nuevasPreguntas[index], 
            [campo]: valor,
            // Resetear opciones si el tipo cambia a texto
            ...(campo === 'tipo' && valor === 'texto' ? { opciones: [] } : {})
        };
        setPreguntas(nuevasPreguntas);
    };

    // Agregar una opción a una pregunta de tipo checkbox o radio
    const agregarOpcion = (preguntaIndex: number) => {
        if (nuevaOpcion.trim()) {
            const nuevasPreguntas = [...preguntas];
            nuevasPreguntas[preguntaIndex].opciones.push(nuevaOpcion.trim());
            setPreguntas(nuevasPreguntas);
            setNuevaOpcion('');
        }
    };

    // Eliminar una opción de una pregunta
    const eliminarOpcion = (preguntaIndex: number, opcionIndex: number) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
        setPreguntas(nuevasPreguntas);
    };

    return (
        <div className="min-h-screen bg-fondo font-serif text-texto p-6">
            <div className="max-w-3xl mx-auto bg-blanco p-6 border border-borde rounded-lg shadow-sm">
                <h2 className="text-2xl mb-4 text-acento text-center">Nuevo Formulario</h2>
                <Formik
                    initialValues={{ nombre: '', email: '', mensaje: '' }}
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            // Enviar formulario con preguntas al backend
                            await fetch(`${import.meta.env.VITE_API_URL}/forms/crear`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                    ...values,
                                    preguntas
                                }),
                            });
                            navigate('/dashboard');
                        } catch (error) {
                            console.error('Error:', error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            {/* Campos básicos del formulario */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm mb-1">Nombre del Formulario</label>
                                    <Field name="nombre" className="w-full p-2 border border-borde rounded bg-fondo" />
                                    <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Email</label>
                                    <Field name="email" type="email" className="w-full p-2 border border-borde rounded bg-fondo" />
                                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm mb-1">Descripción</label>
                                    <Field as="textarea" name="mensaje" className="w-full p-2 border border-borde rounded bg-fondo" />
                                </div>
                            </div>

                            {/* Sección de preguntas */}
                            <div className="border-t pt-6">
                                <h3 className="text-lg mb-4">Preguntas</h3>
                                {preguntas.map((pregunta, index) => (
                                    <div key={index} className="mb-6 p-4 border border-borde rounded">
                                        <div className="flex justify-between mb-2">
                                            <input
                                                type="text"
                                                value={pregunta.texto}
                                                onChange={(e) => actualizarPregunta(index, 'texto', e.target.value)}
                                                placeholder="Texto de la pregunta"
                                                className="w-full p-2 border border-borde rounded bg-fondo mr-2"
                                            />
                                            <select
                                                value={pregunta.tipo}
                                                onChange={(e) => actualizarPregunta(index, 'tipo', e.target.value as Pregunta['tipo'])}
                                                className="p-2 border border-borde rounded bg-fondo"
                                            >
                                                <option value="texto">Texto</option>
                                                <option value="checkbox">Checkbox</option>
                                                <option value="radio">Opción múltiple</option>
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => eliminarPregunta(index)}
                                                className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            >
                                                X
                                            </button>
                                        </div>

                                        {/* Sección de opciones para checkbox y radio */}
                                        {(pregunta.tipo === 'checkbox' || pregunta.tipo === 'radio') && (
                                            <div className="mt-2">
                                                <div className="flex gap-2 mb-2">
                                                    <input
                                                        type="text"
                                                        value={nuevaOpcion}
                                                        onChange={(e) => setNuevaOpcion(e.target.value)}
                                                        placeholder="Nueva opción"
                                                        className="flex-1 p-2 border border-borde rounded bg-fondo"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => agregarOpcion(index)}
                                                        className="px-4 py-2 bg-acento text-white rounded hover:opacity-90"
                                                    >
                                                        Agregar opción
                                                    </button>
                                                </div>
                                                <ul className="space-y-2">
                                                    {pregunta.opciones.map((opcion, opcionIndex) => (
                                                        <li key={opcionIndex} className="flex items-center gap-2">
                                                            <input
                                                                type={pregunta.tipo}
                                                                disabled
                                                                className="form-checkbox"
                                                            />
                                                            <span>{opcion}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => eliminarOpcion(index, opcionIndex)}
                                                                className="ml-auto text-red-500 hover:text-red-700"
                                                            >
                                                                Eliminar
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                                
                                {/* Botón para agregar nueva pregunta */}
                                <button
                                    type="button"
                                    onClick={agregarPregunta}
                                    className="w-full p-2 mt-4 border-2 border-acento text-acento rounded hover:bg-acento hover:text-white transition"
                                >
                                    Agregar Pregunta
                                </button>
                            </div>

                            {/* Botón para guardar todo el formulario */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full p-2 bg-acento text-blanco rounded hover:opacity-90 transition"
                            >
                                {isSubmitting ? 'Guardando...' : 'Guardar Formulario'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}