// src/components/NewForm.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const schema = Yup.object().shape({
    nombre: Yup.string().required('Requerido'),
    email: Yup.string().email('Email inválido').required('Requerido'),
    mensaje: Yup.string(),
});

export default function NewForm() {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [preguntas, setPreguntas] = useState([
        { texto: '', tipo: 'texto', opciones: []}
    ]);

    return (
        <div className="min-h-screen bg-fondo font-serif text-texto flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-blanco p-6 border border-borde rounded-lg shadow-sm">
                <h2 className="text-2xl mb-4 text-acento text-center">Nuevo Formulario</h2>
                <Formik
                    initialValues={{ nombre: '', email: '', mensaje: '' }}
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting }) => {
                        await fetch(`${import.meta.env.VITE_API_URL}/forms/submit`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(values),
                        });
                        setSubmitting(false);
                        navigate('/dashboard');
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Nombre</label>
                                <Field name="nombre" className="w-full p-2 border border-borde rounded bg-fondo" />
                                <ErrorMessage name="nombre" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <Field name="email" type="email" className="w-full p-2 border border-borde rounded bg-fondo" />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Mensaje</label>
                                <Field as="textarea" name="mensaje" className="w-full p-2 border border-borde rounded bg-fondo" />
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full p-2 bg-acento text-blanco rounded hover:opacity-90 transition"
                            >
                                {isSubmitting ? 'Enviando...' : 'Crear'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}