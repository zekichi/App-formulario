// src/components/NewForm.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { use, useState } from 'react';


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

    // Eliminar pregunta específica
    const eliminarPregunta = (index: number) => {
        setPreguntas(preguntas.filter((_, i) => i !== index));
    };

    // Actualizar los campos de una pregunta
    const actualizarPregunta = (index: number, campo: keyof Pregunta, valor:string) => {
        const nuevasPreguntas = [...preguntas];
        nuevasPreguntas[index] = {
            ...nuevasPreguntas [index],
            [campo]: valor,
            // Resetear opciones si el tipo cambia a texto
            ...(campo === 'tipo' && valor === 'texto' ? { opciones: [] } : {})
        };
        setPreguntas(nuevasPreguntas);
    };

    // Agregar una opción a una preguntar de tipo checkbox o radio
    const agregarOpcion = (preguntaIndex: number) => {
        if (nuevaOpción.trim()) {
            const nuevasPreguntas = [...preguntas];
            nuevasPreguntas[preguntaIndex].opciones.push(nuevaOpción.trim());
            setPreguntas(nuevasPreguntas);
            setNuevaOpcion('');
        }
    };

    // Eliminar una opción de una pregunta
    const eliminarOpcion = (preguntaIndex: number, opcionIndex: number) => {
        if (nuevaOpcion.trim()) {
            const nuevasPreguntas = [...preguntas];
            nuevasPreguntas[preguntaIndex].opciones.splice(opcionIndex, 1);
            setPreguntas(nuevasPreguntas);
        }
    };

    return (
        <div className="min-h-screen bg-fondo font-serif text-texto p-6">
            <div className="*:max-w-3xl mx-auto bg-blanco p-6 border-borde rounded-lg shadow-sm">
                <h2 className="text-2xl mb-4 text-acento text-center">Nuevo formulario</h2>
                <Formik
                    initialValues={{ nombre: '', email: '', mensaje: '' }}
                    validationSchema={schema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            // Enviar formulario con preguntas al backend
                            const response = await fetch('/api/formularios', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({ ...values, preguntas }),
                            });
                            if (!response.ok) throw new Error('Error al crear formulario');
                            navigate('/formularios');
                        } catch (error) {
                            console.error(error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                ></Formik>
            </div>
        </div>
    )
}