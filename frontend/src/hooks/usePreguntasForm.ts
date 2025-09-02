// frontend/src/hooks/usePreguntasForm.ts
import { useState } from 'react';
import { Pregunta, PreguntaTipo } from '../types/formulario';

export const usePreguntasForm = () => {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);

    const agregarPregunta = () => {
        const nuevaPregunta: Pregunta = {
            id: crypto.randomUUID(),
            texto: '',
            tipo: 'texto',
            opciones: [],
            required: false
        };
        setPreguntas(prev => [...prev, nuevaPregunta]);
    };

    const eliminarPregunta = (id:string) => {
        setPreguntas (prev => prev.filter(p => p.id !== id));
    };

    const actualizarPregunta = (id: string, campo: keyof Pregunta, valor: string | boolean | string[] | PreguntaTipo) => {
        setPreguntas(prev => prev.map(p => 
            p.id === id ? { ...p, [campo]: valor } : p
        ));
    };

    const agregarOpcion = (preguntaId: string, opcion: string) => {
        setPreguntas(prev => prev.map(p => 
            p.id === preguntaId 
                ? { ...p, opciones: [...p.opciones, opcion] }
                : p
        ));
    };

    const eliminarOpcion = (preguntaId: string, index: number) => {
        setPreguntas(prev => prev.map(p => 
            p.id === preguntaId 
                ? { ...p, opciones: p.opciones.filter((_, i) => i !== index) }
                : p
        ));
    };

    return {
        preguntas,
        agregarPregunta,
        eliminarPregunta,
        actualizarPregunta,
        agregarOpcion,
        eliminarOpcion
    };
};