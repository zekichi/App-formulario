// frontend/src/components/formularios/PreguntaForm.tsx
import type { Pregunta } from '../../types/formulario';
import { useState } from 'react';

interface PreguntaFormProps {
    pregunta: Pregunta;
    onUpdate: (campo: keyof Pregunta, valor: string | boolean) => void;
    onDelete: () => void;
    onAddOption: (opcion: string) => void;
    onDeleteOption: (index: number) => void;
}

export const PreguntaForm = ({
    pregunta,
    onUpdate,
    onDelete,
    onAddOption,
    onDeleteOption
}: PreguntaFormProps) => {
    const [nuevaOpcion, setNuevaOpcion] = useState('');

    const tipoOptions = [
        { value: 'texto', label: 'Texto libre', icon: '📝' },
        { value: 'checkbox', label: 'Selección múltiple', icon: '☑️' },
        { value: 'radio', label: 'Opción única', icon: '🔘' }
    ];

    return (
        <div className="space-y-4">
            {/* Campo de texto de la pregunta */}
            <div>
                <label className="label">Texto de la pregunta</label>
                <input
                    type="text"
                    value={pregunta.texto}
                    onChange={e => onUpdate('texto', e.target.value)}
                    placeholder="Escribe tu pregunta aquí..."
                    className="input"
                />
            </div>

            {/* Selector de tipo */}
            <div>
                <label className="label">Tipo de respuesta</label>
                <div className="grid grid-cols-3 gap-2">
                    {tipoOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onUpdate('tipo', option.value)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                                pregunta.tipo === option.value
                                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="text-2xl mb-1">{option.icon}</div>
                            <div className="text-xs font-medium">{option.label}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Campo requerido */}
            <div>
                <label className="flex items-center gap-3 text-sm">
                    <input
                        type="checkbox"
                        checked={pregunta.required}
                        onChange={e => onUpdate('required', e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span>Campo obligatorio</span>
                </label>
            </div>

            {/* Opciones para checkbox/radio */}
            {(pregunta.tipo === 'checkbox' || pregunta.tipo === 'radio') && (
                <div>
                    <label className="label">Opciones de respuesta</label>
                    
                    {/* Lista de opciones existentes */}
                    <div className="space-y-2 mb-4">
                        {pregunta.opciones.map((opcion, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="flex items-center gap-2 flex-1 p-2 bg-white border border-gray-200 rounded">
                                    <input
                                        type={pregunta.tipo}
                                        disabled
                                        className="text-primary-600"
                                    />
                                    <span className="flex-1">{opcion}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => onDeleteOption(index)}
                                    className="text-red-500 hover:text-red-700 p-1"
                                    disabled={pregunta.opciones.length <= 1}
                                >
                                    🗑️
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Agregar nueva opción */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={nuevaOpcion}
                            onChange={e => setNuevaOpcion(e.target.value)}
                            placeholder="Nueva opción..."
                            className="flex-1 input"
                            onKeyPress={e => {
                                if (e.key === 'Enter' && nuevaOpcion.trim()) {
                                    onAddOption(nuevaOpcion.trim());
                                    setNuevaOpcion('');
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (nuevaOpcion.trim()) {
                                    onAddOption(nuevaOpcion.trim());
                                    setNuevaOpcion('');
                                }
                            }}
                            disabled={!nuevaOpcion.trim()}
                            className="btn btn-primary btn-sm"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};