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

export interface RepuestaFormulario {
    id: number;
    preguntaId: number;
    respuesta: string;
    fecha: string;
}