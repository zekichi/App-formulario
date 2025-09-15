import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface FormData {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  responseCount: number;
}

export default function FormList() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      // Aquí harías la llamada a tu API
      // const response = await fetch('/api/forms', { headers: { Authorization: `Bearer ${token}` }});
      // const data = await response.json();
      
      // Por ahora, datos de ejemplo
      const mockForms: FormData[] = [
        {
          id: '1',
          title: 'Encuesta de Satisfacción',
          description: 'Formulario para evaluar la satisfacción del cliente',
          createdAt: '2024-01-15',
          responseCount: 23
        },
        {
          id: '2',
          title: 'Registro de Evento',
          description: 'Formulario de registro para el evento anual',
          createdAt: '2024-01-10',
          responseCount: 45
        }
      ];
      
      setForms(mockForms);
    } catch (error) {
      console.error('Error fetching forms:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = (formId: string) => {
    const shareUrl = `${window.location.origin}/form/${formId}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Enlace copiado al portapapeles');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fondo font-serif text-texto flex items-center justify-center">
        <div className="text-xl">Cargando formularios...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fondo font-serif text-texto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl text-acento">Mis Formularios</h1>
          <Link
            to="/dashboard"
            className="bg-acento text-blanco px-4 py-2 rounded hover:opacity-90 transition"
          >
            Crear Nuevo Formulario
          </Link>
        </div>

        {forms.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl mb-4">No tienes formularios creados</p>
            <Link
              to="/dashboard"
              className="bg-acento text-blanco px-6 py-3 rounded hover:opacity-90 transition inline-block"
            >
              Crear tu primer formulario
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {forms.map((form) => (
              <div key={form.id} className="bg-blanco p-6 border border-borde rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-medium text-acento mb-2">{form.title}</h3>
                    <p className="text-gray-600 mb-2">{form.description}</p>
                    <p className="text-sm text-gray-500">
                      Creado: {new Date(form.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-acento">{form.responseCount}</p>
                    <p className="text-sm text-gray-500">respuestas</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/form/${form.id}/view`}
                    className="bg-gray-200 text-texto px-4 py-2 rounded hover:bg-gray-300 transition text-sm"
                  >
                    Ver Formulario
                  </Link>
                  <Link
                    to={`/form/${form.id}/responses`}
                    className="bg-blue-500 text-blanco px-4 py-2 rounded hover:bg-blue-600 transition text-sm"
                  >
                    Ver Respuestas
                  </Link>
                  <button
                    onClick={() => copyShareLink(form.id)}
                    className="bg-green-500 text-blanco px-4 py-2 rounded hover:bg-green-600 transition text-sm"
                  >
                    Copiar Enlace
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
