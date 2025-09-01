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

    return (
        <div className="p-4 border border-borde rounded mb-4">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={pregunta.texto}
                    onChange={e => onUpdate('texto', e.target.value)}
                    placeholder="Texto de la pregunta"
                    className="flex-1 p-2 border border-borde rounded"
                />
                <select
                    value={pregunta.tipo}
                    onChange={e => onUpdate('tipo', e.target.value)}
                    className="p-2 border border-borde rounded"
                >
                    <option value="texto">Texto</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                </select>
                <button
                    type="button"
                    onClick={onDelete}
                    className="p-2 text-red-500 hover:text-red-700"
                >
                    Eliminar
                </button>
            </div>

            {(pregunta.tipo === 'checkbox' || pregunta.tipo === 'radio') && (
                <div className="ml-4">
                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            value={nuevaOpcion}
                            onChange={e => setNuevaOpcion(e.target.value)}
                            placeholder="Nueva opción"
                            className="flex-1 p-2 border border-borde rounded"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                onAddOption(nuevaOpcion);
                                setNuevaOpcion('');
                            }}
                            className="p-2 bg-acento text-white rounded"
                        >
                            Agregar
                        </button>
                    </div>
                    <ul className="space-y-2">
                        {pregunta.opciones.map((opcion, index) => (
                            <li key={index} className="flex items-center gap-2">
                                <input
                                    type={pregunta.tipo}
                                    disabled
                                    checked={false}
                                    className="form-checkbox"
                                />
                                <span>{opcion}</span>
                                <button
                                    type="button"
                                    onClick={() => onDeleteOption(index)}
                                    className="ml-auto text-red-500"
                                >
                                    ×
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};