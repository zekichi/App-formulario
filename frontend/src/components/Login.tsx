// src/components/Login.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext.tsx'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Requerido'),
    password: Yup.string().min(6,'Mínimo 6 caracteres').required('Requerido')
});

export default function Login() {
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await login(email, password);
            // La redirección la maneja AuthContext
        } catch (err) {
            setError('Error al iniciar sesión');
        }
    };

    return (
        <div className="min-h-screen bg-fondo font-serif text-texto flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-blanco p-6 border border-borde rounded-lg shadow-sm">
                <h2 className="text-2xl mb-4 text-acento  text-center">Iniciar sesión</h2>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting, setFieldError }) => {
                        try {
                            await login(values.email, values.password);
                        } catch (err: any) {
                            setFieldError('email', 'Credenciales inválidas');
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm mb-1">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="w-full p-2 border border-borde rounded bg-fondo"
                                />
                                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Contraseña</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="w-full p-2 border border-borde rounded bg-fondo"
                                />
                                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                            </div>
                            {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-acento text-blanco py-2 rounded hover:opacity-90 transition"
                            >
                                {isSubmitting ? 'Cargando...' : 'Iniciar sesión'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}