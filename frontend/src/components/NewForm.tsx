// src/components/NewForm.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
import { usePreguntasForm } from '../hooks/usePreguntasForm';
import { PreguntaForm } from './formularios/PreguntaForm';
import type { FormularioValues} from '../types/formulario';

// Esquema de validación para el formulario principal
const schema = Yup.object().shape({
    nombre: Yup.string()
        .min(3, 'Mínimo 3 caracteres')
        .max(100, 'Máximo 100 caracteres')
        .required('Requerido'),
    email: Yup.string()
        .email('Email inválido')
        .required('Requerido'),
    mensaje: Yup.string()
        .max(500, 'Máximo 500 caracteres'),
    preguntas: Yup.array().of(
        Yup.object().shape({
            texto: Yup.string().required('Pregunta requerida'),
            opciones: Yup.array().when('tipo', {
                is: (tipo: string) => ['checkbox', 'radio'].includes(tipo),
                then: () => Yup.array()
                    .min(2, 'Mínimo 2 opciones')
                    .required('Opciones requeridas')
            })
        })
    )
});

export default function NewForm() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const {
        preguntas,
        agregarPregunta,
        eliminarPregunta,
        actualizarPregunta,
        agregarOpcion,
        eliminarOpcion
    } = usePreguntasForm();

    // Agregar esta validación antes del submit
    const validateForm = (values: FormularioValues) => {
        if (preguntas.length === 0) {
            return { preguntas: 'Debe agregar al menos una pregunta' };
        }
        return {};
    };

    return (
        <div className="min-h-screen bg-fondo font-serif text-texto p-6">
            <div className="max-w-3xl mx-auto bg-blanco p-6 border border-borde rounded-lg shadow-sm">
                <h2 className="text-2xl mb-4 text-acento text-center">
                    Nuevo formulario
                </h2>
                <Formik<FormularioValues>
                    initialValues={{
                        nombre: '',
                        email: '',
                        mensaje: '',
                        preguntas: []
                    }}
                    validationSchema={schema}
                    validate={validateForm}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        try {
                            console.log('Enviando formulario:', { ...values, preguntas });
                            const response = await fetch(
                                `${import.meta.env.VITE_API_URL}/forms/crear`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        ...values,
                                        preguntas
                                    })
                                }
                            );

                            const data = await response.json();
                            console.log('Respuesta:', data);

                            if (!response.ok) {
                                throw new Error(data.error || 'Error al crear formulario');
                            }

                            navigate('/dashboard');
                        } catch (error: any) {
                            console.error('Error:', error);
                            setFieldError('nombre', error.message);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
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

                            <div className="border-t pt-6">
                                <h3 className="text-lg mb-4">Preguntas</h3>
                                {preguntas.map((pregunta) => (
                                    <PreguntaForm
                                        key={pregunta.id}
                                        pregunta={pregunta}
                                        onUpdate={(campo, valor) => actualizarPregunta(pregunta.id, campo, valor)}
                                        onDelete={() => eliminarPregunta(pregunta.id)}
                                        onAddOption={(opcion) => agregarOpcion(pregunta.id, opcion)}
                                        onDeleteOption={(index) => eliminarOpcion(pregunta.id, index)}
                                    />
                                ))}
                                
                                <button
                                    type="button"
                                    onClick={agregarPregunta}
                                    className="w-full p-2 mt-4 border-2 border-acento text-acento rounded hover:bg-acento hover:text-white transition"
                                >
                                    Agregar Pregunta
                                </button>
                            </div>

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