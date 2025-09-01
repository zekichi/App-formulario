// frontend/src/hooks/usePreguntasForm.ts
import { useState } from 'react';
import type { Pregunta, PreguntaTipo } from '../types/formulario';

export const usePreguntasForm = () => {
    const [preguntas, setPreguntas] = useState<Pregunta[]>([]);
    const [opcionesPorPregunta, setOpcionesPorPregunta] = useState<Record<string, string[]>>({});

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
        const { [id]: _, ...restOpciones } = opcionesPorPregunta;
        setOpcionesPorPregunta(restOpciones);
    };

    const actualizarPregunta = (id: string, campo: keyof Pregunta, valor: string | boolean) => {
        setPregunta(prev => prev.map(p => {
            if (p.id !== id) return p;
            return {
                ...p,
                [campo]: valor
                ...(campo === 'tipo' && valor === 'texto' ? { opciones: [] } : {})
            };
        }));
    };

    const agregarOpcion = (preguntaId: string, opcion: string) => {
        if (!opcion.trim()) return;

        setPreguntas(prev => prev.map(p => {
            if (p.id !== preguntaId) return p;
            return {
                ...p,
                opciones: [...p.opciones, opcion.trim()]
            };
        }));
    };

    const eliminarOpcion = (preguntaId: string, index: number) => {
        setPreguntas(prev => prev.map(p => {
            if (p.id !== preguntaId) return p;
            const nuevasOpciones = [...p.opciones];
            nuevasOpciones.splice(index, 1);
            return {
                ...p,
                opciones: nuevasOpciones
            };
        }));
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