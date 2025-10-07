// src/components/NewForm.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { usePreguntasForm } from '../hooks/usePreguntasForm';
import { PreguntaForm } from './formularios/PreguntaForm';
import type { FormularioValues} from '../types/formulario';
import Navigation from './Navigation';

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

    const validateForm = (values: FormularioValues) => {
        if (preguntas.length === 0) {
            return { preguntas: 'Debe agregar al menos una pregunta' };
        }
        return {};
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            
            <div className="container py-8">
                <div className="max-w-3xl mx-auto bg-white p-8 border border-gray-200 rounded-xl shadow-soft">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-primary-600 mb-2">
                            Crear Nuevo Formulario
                        </h1>
                        <p className="text-gray-600">
                            Diseña tu formulario personalizado agregando diferentes tipos de preguntas
                        </p>
                    </div>

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

                                // CAMBIO: Navegar a la página de éxito con el ID del formulario
                                if (data.formulario_id) {
                                    navigate(`/form/${data.formulario_id}/success`);
                                } else {
                                    navigate('/dashboard');
                                }
                            } catch (error: any) {
                                console.error('Error:', error);
                                setFieldError('nombre', error.message);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-8">
                                {/* Información básica */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="label">Nombre del Formulario *</label>
                                        <Field 
                                            name="nombre" 
                                            className="input"
                                            placeholder="Ej: Encuesta de Satisfacción"
                                        />
                                        <ErrorMessage name="nombre" component="div" className="error-text" />
                                    </div>
                                    
                                    <div>
                                        <label className="label">Email de Contacto *</label>
                                        <Field 
                                            name="email" 
                                            type="email" 
                                            className="input"
                                            placeholder="tu@email.com"
                                        />
                                        <ErrorMessage name="email" component="div" className="error-text" />
                                    </div>
                                    
                                    <div>
                                        <label className="label">Descripción del Formulario</label>
                                        <Field 
                                            as="textarea" 
                                            name="mensaje" 
                                            className="input h-24"
                                            placeholder="Describe brevemente el propósito de este formulario..."
                                        />
                                    </div>
                                </div>

                                {/* Sección de preguntas */}
                                <div className="border-t border-gray-200 pt-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            Preguntas del Formulario
                                        </h3>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                            {preguntas.length} pregunta{preguntas.length !== 1 ? 's' : ''}
                                        </span>
                                    </div>
                                    
                                    {preguntas.length === 0 ? (
                                        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                                            <div className="text-gray-400 text-4xl mb-4">📝</div>
                                            <p className="text-gray-500 text-lg mb-2">No hay preguntas agregadas</p>
                                            <p className="text-gray-400 text-sm">Haz clic en "Agregar Pregunta" para comenzar</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {preguntas.map((pregunta, index) => (
                                                <div key={pregunta.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <span className="text-sm font-medium text-gray-500">
                                                            Pregunta #{index + 1}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => eliminarPregunta(pregunta.id)}
                                                            className="text-red-500 hover:text-red-700 text-xl font-bold"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                    <PreguntaForm
                                                        pregunta={pregunta}
                                                        onUpdate={(campo, valor) => actualizarPregunta(pregunta.id, campo, valor)}
                                                        onDelete={() => eliminarPregunta(pregunta.id)}
                                                        onAddOption={(opcion) => agregarOpcion(pregunta.id, opcion)}
                                                        onDeleteOption={(index) => eliminarOpcion(pregunta.id, index)}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    <button
                                        type="button"
                                        onClick={agregarPregunta}
                                        className="btn btn-secondary w-full mt-6"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Agregar Pregunta
                                    </button>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-4 pt-6 border-t border-gray-200">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || preguntas.length === 0}
                                        className="btn btn-primary flex-1"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="loading-spinner mr-2"></div>
                                                Guardando...
                                            </>
                                        ) : (
                                            'Crear Formulario'
                                        )}
                                    </button>
                                    
                                    <button
                                        type="button"
                                        onClick={() => navigate('/dashboard')}
                                        className="btn btn-secondary"
                                    >
                                        Cancelar
                                    </button>
                                </div>

                                {/* Mensaje de validación */}
                                {preguntas.length === 0 && (
                                    <div className="text-center text-red-500 text-sm">
                                        * Debe agregar al menos una pregunta para crear el formulario
                                    </div>
                                )}
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
}

