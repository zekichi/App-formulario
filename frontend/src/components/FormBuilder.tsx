import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'number' | 'select' | 'textarea' | 'radio' | 'checkbox' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormData {
  title: string;
  description: string;
  fields: FormField[];
}

export default function FormBuilder() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    fields: []
  });
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fieldTypes = [
    { value: 'text', label: 'Texto corto', icon: '📝' },
    { value: 'textarea', label: 'Texto largo', icon: '📄' },
    { value: 'email', label: 'Correo electrónico', icon: '📧' },
    { value: 'number', label: 'Número', icon: '🔢' },
    { value: 'date', label: 'Fecha', icon: '📅' },
    { value: 'select', label: 'Selección única', icon: '📋' },
    { value: 'radio', label: 'Opción múltiple', icon: '🔘' },
    { value: 'checkbox', label: 'Casillas múltiples', icon: '☑️' }
  ];

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: `Nuevo campo ${type}`,
      placeholder: type === 'email' ? 'ejemplo@correo.com' : '',
      required: false,
      options: ['select', 'radio', 'checkbox'].includes(type) ? ['Opción 1', 'Opción 2'] : undefined
    };
    
    setFormData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.map(field => 
        field.id === fieldId ? { ...field, ...updates } : field
      )
    }));
  };

  const removeField = (fieldId: string) => {
    setFormData(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  const moveField = (fromIndex: number, toIndex: number) => {
    setFormData(prev => {
      const newFields = [...prev.fields];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      return { ...prev, fields: newFields };
    });
  };

  const addOption = (fieldId: string) => {
    const field = formData.fields.find(f => f.id === fieldId);
    if (field && field.options) {
      updateField(fieldId, {
        options: [...field.options, `Opción ${field.options.length + 1}`]
      });
    }
  };

  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    const field = formData.fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions[optionIndex] = value;
      updateField(fieldId, { options: newOptions });
    }
  };

  const removeOption = (fieldId: string, optionIndex: number) => {
    const field = formData.fields.find(f => f.id === fieldId);
    if (field && field.options && field.options.length > 1) {
      const newOptions = field.options.filter((_, index) => index !== optionIndex);
      updateField(fieldId, { options: newOptions });
    }
  };

  const saveForm = async () => {
    if (!formData.title.trim()) {
      alert('Por favor, ingresa un título para el formulario');
      return;
    }
    
    if (formData.fields.length === 0) {
      alert('Por favor, agrega al menos un campo al formulario');
      return;
    }

    setSaving(true);
    try {
      // Aquí harías la llamada a tu API
      // const response = await fetch('/api/forms', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     ...formData,
      //     userId: user.id
      //   })
      // });
      
      console.log('Formulario guardado:', formData);
      alert('Formulario guardado exitosamente');
      navigate('/forms');
    } catch (error) {
      console.error('Error saving form:', error);
      alert('Error al guardar el formulario');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-fondo font-serif text-texto p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl text-acento mb-2">Crear Nuevo Formulario</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/forms')}
              className="text-gray-600 hover:text-acento transition"
            >
              ← Volver a mis formularios
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel de campos disponibles */}
          <div className="lg:col-span-1">
            <div className="bg-blanco p-4 border border-borde rounded-lg shadow-sm sticky top-6">
              <h3 className="text-lg text-acento mb-4">Agregar Campos</h3>
              <div className="space-y-2">
                {fieldTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => addField(type.value as FormField['type'])}
                    className="w-full text-left p-3 border border-gray-200 rounded hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <span className="text-xl">{type.icon}</span>
                    <span>{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Constructor del formulario */}
          <div className="lg:col-span-2">
            <div className="bg-blanco p-6 border border-borde rounded-lg shadow-sm">
              {/* Información básica */}
              <div className="mb-6">
                <div className="mb-4">
                  <label className="block text-sm mb-2">Título del formulario *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-borde rounded bg-fondo text-lg"
                    placeholder="Nombre de tu formulario"
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm mb-2">Descripción (opcional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-borde rounded bg-fondo h-20"
                    placeholder="Breve descripción de tu formulario"
                  />
                </div>
              </div>

              {/* Campos del formulario */}
              <div className="border-t pt-6">
                <h3 className="text-lg text-acento mb-4">
                  Campos del formulario ({formData.fields.length})
                </h3>
                
                {formData.fields.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <p className="text-lg mb-2">No hay campos agregados</p>
                    <p className="text-sm">Selecciona un tipo de campo del panel izquierdo</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border border-gray-200 rounded p-4 bg-gray-50"
                        draggable
                        onDragStart={() => setDraggedIndex(index)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          if (draggedIndex !== null && draggedIndex !== index) {
                            moveField(draggedIndex, index);
                          }
                          setDraggedIndex(null);
                        }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 cursor-move">⋮⋮</span>
                            <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                              {fieldTypes.find(t => t.value === field.type)?.label}
                            </span>
                          </div>
                          <button
                            onClick={() => removeField(field.id)}
                            className="text-red-500 hover:text-red-700 text-xl"
                          >
                            ×
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-xs mb-1">Etiqueta</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={(e) => updateField(field.id, { label: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                          </div>
                          
                          {!['radio', 'checkbox', 'select'].includes(field.type) && (
                            <div>
                              <label className="block text-xs mb-1">Placeholder</label>
                              <input
                                type="text"
                                value={field.placeholder || ''}
                                onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 mb-3">
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(e) => updateField(field.id, { required: e.target.checked })}
                            />
                            Campo requerido
                          </label>
                        </div>

                        {/* Opciones para campos de selección */}
                        {field.options && (
                          <div>
                            <label className="block text-xs mb-2">Opciones</label>
                            {field.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex gap-2 mb-2">
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => updateOption(field.id, optionIndex, e.target.value)}
                                  className="flex-1 p-2 border border-gray-300 rounded text-sm"
                                />
                                <button
                                  onClick={() => removeOption(field.id, optionIndex)}
                                  className="text-red-500 hover:text-red-700 px-2"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => addOption(field.id)}
                              className="text-acento hover:opacity-80 text-sm"
                            >
                              + Agregar opción
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex gap-4 mt-8 pt-6 border-t">
                <button
                  onClick={saveForm}
                  disabled={saving}
                  className="bg-acento text-blanco px-6 py-2 rounded hover:opacity-90 transition disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar Formulario'}
                </button>
                
                <button
                  onClick={() => navigate('/forms')}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
