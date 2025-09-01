// frontend/src/components/ResponderForm.tsx
export default function ResponderForm() {
    const { id } = useParams();
    const [formulario, setFormulario] = useState(null);
    const [respuestas, setRespuestas] = useState({});

    // Cargar formulario
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/forms/${id}`)
            .then(res => res.json())
            .then(setFormulario);
    }, [id]);

    // ... lógica para responder
}