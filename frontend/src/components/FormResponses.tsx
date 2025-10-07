// frontend/src/components/FormResponses.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from './Navigation';

interface Response {
    id: number;
    respuestas: Record<string, string>;
    fecha: string;
}

interface FormData {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    preguntas: Array<{
        id: number;
        texto: string;
        tipo: string;
        opciones: string[];
    }>;
}

export default function FormResponses() {
    const { formId } = useParams<{ formId: string }>();
    const [form, setForm] = useState<FormData | null>(null);
    const [responses, setResponses] = useState<Response[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        fetchFormAndResponses();
    }, [formId]);

    const fetchFormAndResponses = async () => {
        try {
            // Obtener información del formulario
            const formResponse = await fetch(
                `${import.meta.env.VITE_API_URL}/forms/formulario/${formId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (formResponse.ok) {
                const formData = await formResponse.json();
                setForm(formData);
            }

            // Obtener respuestas (mock por ahora)
            setResponses([
                {
                    id: 1,
                    respuestas: {
                        "1": "Juan Pérez",
                        "2": "juan@email.com",
                        "3": "Excelente",
                        "4": "Muy buen servicio"
                    },
                    fecha: "2025-01-15T10:30:00.000Z"
                },
                {
                    id: 2,
                    respuestas: {
                        "1": "María García",
                        "2": "maria@email.com", 
                        "3": "Bueno",
                        "4": "Todo bien"
                    },
                    fecha: "2025-01-15T11:15:00.000Z"
                }
            ]);

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const exportToCSV = () => {
        if (!form || responses.length === 0) return;

        const headers = ['Fecha', ...form.preguntas.map(p => p.texto)];
        const csvContent = [
            headers.join(','),
            ...responses.map(response => [
                new Date(response.fecha).toLocaleDateString(),
                ...form.preguntas.map(p => 
                    `"${response.respuestas[p.id.toString()] || ''}"`
                )
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `respuestas-${form.nombre}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Cargando respuestas...</div>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Formulario no encontrado</h2>
                    <Link to="/dashboard" className="text-primary-600 hover:underline">
                        Volver al dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            
            <div className="container py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="bg-white p-6 rounded-lg shadow-soft mb-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    📊 Respuestas: {form.nombre}
                                </h1>
                                <p className="text-gray-600 mb-4">{form.mensaje}</p>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <span>📝 {form.preguntas.length} preguntas</span>
                                    <span>👥 {responses.length} respuestas</span>
                                    <span>📅 Creado: {new Date().toLocaleDateString()}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={exportToCSV}
                                    disabled={responses.length === 0}
                                    className="btn btn-secondary btn-sm"
                                >
                                    📥 Exportar CSV
                                </button>
                                <Link
                                    to={`/form/${formId}/success`}
                                    className="btn btn-primary btn-sm"
                                >
                                    🔗 Compartir
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas rápidas */}
                    <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-soft text-center">
                            <div className="text-2xl font-bold text-primary-600">{responses.length}</div>
                            <div className="text-sm text-gray-600">Total Respuestas</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-soft text-center">
                            <div className="text-2xl font-bold text-green-600">
                                {responses.length > 0 ? Math.round(responses.length / 7) : 0}
                            </div>
                            <div className="text-sm text-gray-600">Respuestas/día</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-soft text-center">
                            <div className="text-2xl font-bold text-blue-600">
                                {form.preguntas.length}
                            </div>
                            <div className="text-sm text-gray-600">Preguntas</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-soft text-center">
                            <div className="text-2xl font-bold text-purple-600">100%</div>
                            <div className="text-sm text-gray-600">Tasa Completado</div>
                        </div>
                    </div>

                    {/* Respuestas */}
                    <div className="bg-white rounded-lg shadow-soft">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Respuestas Individuales
                            </h2>
                        </div>

                        {responses.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="text-gray-400 text-4xl mb-4">📋</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No hay respuestas aún
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    Las respuestas aparecerán aquí cuando las personas completen tu formulario.
                                </p>
                                <Link
                                    to={`/form/${formId}/success`}
                                    className="btn btn-primary"
                                >
                                    Compartir Formulario
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {responses.map((response, index) => (
                                    <div key={response.id} className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-medium text-gray-900">
                                                Respuesta #{index + 1}
                                            </h3>
                                            <span className="text-sm text-gray-500">
                                                {new Date(response.fecha).toLocaleString()}
                                            </span>
                                        </div>
                                        
                                        <div className="grid gap-4">
                                            {form.preguntas.map((pregunta) => (
                                                <div key={pregunta.id} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                                                            {pregunta.tipo}
                                                        </span>
                                                        <span className="font-medium text-gray-700">
                                                            {pregunta.texto}
                                                        </span>
                                                    </div>
                                                    <div className="text-gray-900 font-medium">
                                                        {response.respuestas[pregunta.id.toString()] || 
                                                         <span className="text-gray-400 italic">Sin respuesta</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}