import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface FormField {
  id: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
}

interface FormData {
  id: string;
  title: string;
  description: string;
  fields: FormField[];
  createdAt: string;
  shareUrl?: string;
}

export default function FormView() {
  const { formId } = useParams<{ formId: string }>();
  const [form, setForm] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const fetchForm = async () => {
    try {
      // Llamada real a tu API cuando esté implementada
      // const response = await fetch(`${import.meta.env.VITE_API_URL}/forms/${formId}`, {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const data = await response.json();
      
      // Datos de ejemplo por ahora
      const mockForm: FormData = {
        id: formId!,
        title: 'Formulario Creado Exitosamente',
        description: 'Tu formulario ha sido creado y está listo para recibir respuestas.',
        fields: [], // Se llenarían desde la API
        createdAt: new Date().toISOString(),
        shareUrl: `${window.location.origin}/form/${formId}`
      };
      
      setForm(mockForm);
    } catch (error) {
      console.error('Error fetching form:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    const shareUrl = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Enlace para compartir copiado al portapapeles');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fondo font-serif text-texto flex items-center justify-center">
        <div className="text-xl">Cargando formulario...</div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-fondo font-serif text-texto flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Formulario no encontrado</h2>
          <Link to="/dashboard" className="text-acento hover:underline">
            Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fondo font-serif text-texto p-6">
      <div className="max-w-2xl mx-auto">
        {/* Mensaje de éxito */}
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <div className="text-green-500 text-2xl mr-3">✓</div>
            <div>
              <strong className="font-bold">¡Formulario creado exitosamente!</strong>
              <p className="text-sm">Tu formulario está listo para recibir respuestas.</p>
            </div>
          </div>
        </div>

        <div className="bg-blanco p-6 border border-borde rounded-lg shadow-sm mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl text-acento mb-2">{form.title}</h1>
              <p className="text-gray-600 mb-2">{form.description}</p>
              <p className="text-sm text-gray-500">
                Creado: {new Date(form.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={copyShareLink}
              className="bg-green-500 text-blanco px-4 py-2 rounded hover:bg-green-600 transition"
            >
              📋 Copiar Enlace para Compartir
            </button>
            <Link
              to={`/form/${formId}`}
              className="bg-blue-500 text-blanco px-4 py-2 rounded hover:bg-blue-600 transition"
              target="_blank"
            >
              👁️ Ver Formulario Público
            </Link>
            <Link
              to="/dashboard"
              className="bg-gray-500 text-blanco px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              🏠 Volver al Dashboard
            </Link>
            <Link
              to="/forms/new"
              className="bg-acento text-blanco px-4 py-2 rounded hover:opacity-90 transition"
            >
              ➕ Crear Otro Formulario
            </Link>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl text-acento mb-4">Próximos pasos:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">1.</span>
                Comparte el enlace con las personas que quieres que respondan
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">2.</span>
                Las respuestas se guardarán automáticamente
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">3.</span>
                Puedes ver las respuestas desde tu dashboard
              </li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">
              <strong>Enlace para compartir:</strong>
            </p>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={form.shareUrl}
                readOnly
                className="flex-1 p-2 text-sm border border-gray-300 rounded bg-white"
              />
              <button
                onClick={copyShareLink}
                className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded transition"
              >
                Copiar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
