import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
}

export default function PublicForm() {
  const { formId } = useParams<{ formId: string }>();
  const [form, setForm] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const fetchForm = async () => {
    try {
      // Aquí harías la llamada a tu API
      // const response = await fetch(`/api/forms/${formId}/public`);
      // const data = await response.json();
      
      // Datos de ejemplo
      const mockForm: FormData = {
        id: formId!,
        title: 'Encuesta de Satisfacción',
        description: 'Por favor, completa esta encuesta para ayudarnos a mejorar nuestros servicios.',
        fields: [
          {
            id: '1',
            type: 'text',
            label: 'Nombre completo',
            required: true
          },
          {
            id: '2',
            type: 'email',
            label: 'Correo electrónico',
            required: true
          },
          {
            id: '3',
            type: 'select',
            label: '¿Cómo calificarías nuestro servicio?',
            required: true,
            options: ['Excelente', 'Bueno', 'Regular', 'Malo']
          },
          {
            id: '4',
            type: 'textarea',
            label: 'Comentarios adicionales',
            required: false
          }
        ]
      };
      
      setForm(mockForm);
    } catch (error) {
      console.error('Error fetching form:', error);
    } finally {
      setLoading(false);
    }
  };

  const createValidationSchema = (fields: FormField[]) => {
    const schemaFields: any = {};
    
    fields.forEach((field) => {
      let validator = Yup.string();
      
      if (field.type === 'email') {
        validator = validator.email('Email inválido');
      }
      
      if (field.required) {
        validator = validator.required('Este campo es requerido');
      }
      
      schemaFields[field.id] = validator;
    });
    
    return Yup.object().shape(schemaFields);
  };

  const createInitialValues = (fields: FormField[]) => {
    const values: any = {};
    fields.forEach((field) => {
      values[field.id] = '';
    });
    return values;
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
          <p className="text-gray-600">El formulario que buscas no existe o ha sido eliminado.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-fondo font-serif text-texto flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-blanco p-8 border border-borde rounded-lg shadow-sm">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h2 className="text-2xl text-acento mb-2">¡Gracias!</h2>
          <p className="text-gray-600">Tu respuesta ha sido enviada correctamente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fondo font-serif text-texto p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-blanco p-8 border border-borde rounded-lg shadow-sm">
          <h1 className="text-3xl text-acento mb-4">{form.title}</h1>
          {form.description && (
            <p className="text-gray-600 mb-6">{form.description}</p>
          )}

          <Formik
            initialValues={createInitialValues(form.fields)}
            validationSchema={createValidationSchema(form.fields)}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Aquí enviarías las respuestas a tu API
                // await fetch(`/api/forms/${formId}/responses`, {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(values)
                // });
                
                console.log('Respuestas enviadas:', values);
                setSubmitted(true);
              } catch (error) {
                console.error('Error submitting form:', error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                {form.fields.map((field) => (
                  <div key={field.id}>
                    <label className="block text-sm mb-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    
                    {field.type === 'text' && (
                      <Field
                        name={field.id}
                        type="text"
                        className="w-full p-3 border border-borde rounded bg-fondo"
                      />
                    )}
                    
                    {field.type === 'email' && (
                      <Field
                        name={field.id}
                        type="email"
                        className="w-full p-3 border border-borde rounded bg-fondo"
                      />
                    )}
                    
                    {field.type === 'select' && (
                      <Field
                        name={field.id}
                        as="select"
                        className="w-full p-3 border border-borde rounded bg-fondo"
                      >
                        <option value="">Selecciona una opción</option>
                        {field.options?.map((option, index) => (
                          <option key={index} value={option}>{option}</option>
                        ))}
                      </Field>
                    )}
                    
                    {field.type === 'textarea' && (
                      <Field
                        name={field.id}
                        as="textarea"
                        rows="4"
                        className="w-full p-3 border border-borde rounded bg-fondo"
                      />
                    )}
                    
                    <ErrorMessage name={field.id} component="div" className="text-red-600 text-sm mt-1" />
                  </div>
                ))}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-acento text-blanco py-3 rounded hover:opacity-90 transition text-lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Respuestas'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
