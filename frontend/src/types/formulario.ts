//frontend/scr/types/formulario
export type PreguntaTipo = 'texto' | 'checkbox' | 'radio';

export interface Pregunta {
    id: string;
    texto: string;
    tipo: PreguntaTipo;
    opciones: string[];
    required: boolean;
}

export interface FormularioValues {
    nombre: string;
    email: string;
    mensaje: string;
    preguntas: Pregunta[];
}

export interface FormularioResponse {
    id: string;
    nombre: string;
    email: string;
    mensaje: string;
    preguntas: Pregunta[];
    createdAt: string;
    userId: string;
}