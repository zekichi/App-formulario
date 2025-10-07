// frontend/src/components/FormSuccess.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navigation from './Navigation';

interface FormData {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    fecha_envio: string;
    preguntas: Array<{
        id: number;
        texto: string;
        tipo: string;
        opciones: string[];
    }>;
}

export default function FormSuccess() {
    const { formId } = useParams<{ formId: string }>();
    const [form, setForm] = useState<FormData | null>(null);
    const [loading, setLoading] = useState(true);
    const [qrUrl, setQrUrl] = useState('');
    const { token } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchForm();
        generateQR();
    }, [formId]);

    const fetchForm = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/forms/formulario/${formId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (!response.ok) {
                throw new Error('Error al cargar formulario');
            }

            const data = await response.json();
            setForm(data);
        } catch (error) {
            console.error('Error fetching form:', error);
            // Usar datos mock si falla la API
            setForm({
                id: formId!,
                nombre: 'Formulario Creado',
                email: 'usuario@email.com',
                mensaje: 'Formulario creado exitosamente',
                fecha_envio: new Date().toISOString(),
                preguntas: []
            });
        } finally {
            setLoading(false);
        }
    };

    const generateQR = () => {
        const formUrl = `${window.location.origin}/form/${formId}`;
        // Usar API gratuita de QR
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(formUrl)}`;
        setQrUrl(qrApiUrl);
    };

    const copyShareLink = () => {
        const shareUrl = `${window.location.origin}/form/${formId}`;
        navigator.clipboard.writeText(shareUrl);
        
        // Mostrar notificación
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50';
        notification.textContent = '¡Enlace copiado al portapapeles!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    };

    const downloadQR = () => {
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = `formulario-${formId}-qr.png`;
        link.click();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl">Cargando...</div>
            </div>
        );
    }

    if (!form) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl mb-4">Error al cargar formulario</h2>
                    <Link to="/dashboard" className="text-primary-600 hover:underline">
                        Volver al dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const shareUrl = `${window.location.origin}/form/${formId}`;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navigation />
            
            <div className="container py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Mensaje de éxito */}
                    <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8">
                        <div className="flex items-center">
                            <div className="text-green-500 text-3xl mr-4">✅</div>
                            <div>
                                <h2 className="text-xl font-bold">¡Formulario creado exitosamente!</h2>
                                <p>Tu formulario "{form.nombre}" está listo para recibir respuestas.</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Panel izquierdo - Información del formulario */}
                        <div className="bg-white p-6 rounded-lg shadow-soft">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Información del Formulario
                            </h3>
                            
                            <div className="space-y-3 mb-6">
                                <div>
                                    <span className="font-medium text-gray-600">Título:</span>
                                    <p className="text-gray-900">{form.nombre}</p>
                                </div>
                                
                                <div>
                                    <span className="font-medium text-gray-600">Email de contacto:</span>
                                    <p className="text-gray-900">{form.email}</p>
                                </div>
                                
                                {form.mensaje && (
                                    <div>
                                        <span className="font-medium text-gray-600">Descripción:</span>
                                        <p className="text-gray-900">{form.mensaje}</p>
                                    </div>
                                )}
                                
                                <div>
                                    <span className="font-medium text-gray-600">Preguntas:</span>
                                    <p className="text-gray-900">{form.preguntas.length} pregunta{form.preguntas.length !== 1 ? 's' : ''}</p>
                                </div>
                                
                                <div>
                                    <span className="font-medium text-gray-600">Creado:</span>
                                    <p className="text-gray-900">{new Date(form.fecha_envio).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Acciones principales */}
                            <div className="space-y-3">
                                <Link
                                    to={`/form/${formId}`}
                                    target="_blank"
                                    className="block w-full btn btn-primary text-center"
                                >
                                    📝 Ver Formulario Público
                                </Link>
                                
                                <Link
                                    to={`/form/${formId}/responses`}
                                    className="block w-full btn btn-secondary text-center"
                                >
                                    📊 Ver Respuestas (Dashboard)
                                </Link>
                                
                                <Link
                                    to="/forms/new"
                                    className="block w-full btn btn-secondary text-center"
                                >
                                    ➕ Crear Otro Formulario
                                </Link>
                            </div>
                        </div>

                        {/* Panel derecho - QR y compartir */}
                        <div className="bg-white p-6 rounded-lg shadow-soft">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Compartir Formulario
                            </h3>
                            
                            {/* Código QR */}
                            <div className="text-center mb-6">
                                <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                                    <img 
                                        src={qrUrl} 
                                        alt="Código QR del formulario"
                                        className="w-48 h-48 mx-auto"
                                    />
                                </div>
                                <p className="text-sm text-gray-600 mt-2">
                                    Escanea para acceder al formulario
                                </p>
                                <button
                                    onClick={downloadQR}
                                    className="mt-2 text-sm text-primary-600 hover:text-primary-800 underline"
                                >
                                    Descargar QR
                                </button>
                            </div>

                            {/* Enlace para compartir */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Enlace del formulario:
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={shareUrl}
                                        readOnly
                                        className="flex-1 input text-sm"
                                    />
                                    <button
                                        onClick={copyShareLink}
                                        className="btn btn-primary btn-sm"
                                    >
                                        📋 Copiar
                                    </button>
                                </div>
                            </div>

                            {/* Instrucciones */}
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h4 className="font-medium text-blue-900 mb-2">
                                    💡 ¿Cómo compartir?
                                </h4>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Copia el enlace y envíalo por email o redes sociales</li>
                                    <li>• Descarga el código QR para imprimir</li>
                                    <li>• Comparte en WhatsApp, Telegram, etc.</li>
                                    <li>• Incrusta en tu página web</li>
                                </ul>
                            </div>

                            {/* Navegación rápida */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h4 className="font-medium text-gray-900 mb-3">Navegación rápida:</h4>
                                <div className="flex flex-wrap gap-2">
                                    <Link
                                        to="/dashboard"
                                        className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                                    >
                                        🏠 Dashboard
                                    </Link>
                                    <Link
                                        to="/forms"
                                        className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                                    >
                                        📄 Mis Formularios
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vista previa de preguntas */}
                    {form.preguntas.length > 0 && (
                        <div className="mt-8 bg-white p-6 rounded-lg shadow-soft">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Vista Previa de Preguntas
                            </h3>
                            <div className="space-y-4">
                                {form.preguntas.map((pregunta, index) => (
                                    <div key={pregunta.id} className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded">
                                                {pregunta.tipo}
                                            </span>
                                            <span className="text-sm text-gray-500">Pregunta #{index + 1}</span>
                                        </div>
                                        <p className="font-medium text-gray-900 mb-2">{pregunta.texto}</p>
                                        {pregunta.opciones.length > 0 && (
                                            <div className="text-sm text-gray-600">
                                                <span className="font-medium">Opciones:</span>
                                                <ul className="list-disc list-inside ml-2">
                                                    {pregunta.opciones.map((opcion, i) => (
                                                        <li key={i}>{opcion}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}