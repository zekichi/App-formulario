# 📄 Listado de Formularios - Visualización desde React

## ⚙️ Componentes involucrados

- **Backend Flask**
    - Ruta: 'GET /formularios'
    - Devuelve un arreglo de formularios en formato JSON

- **Frontend React**
    - Componente: 'ListadoFormularios.jsx'
    - Realiza consulta con Axios y muestra datos en tabla

---

## 🔗 Flujo de datos

1. El componente se monta ('useEffect')
2. Se dispara una petición GET a 'http://localhost:5000/formularios'
3. Flask responde con un arreglo de registros desde PostgreSQL
4. React los muestra en una tabla HTML

---

## 🧪 Ejemplo de respuesta

````json
[
    {
        "id": 1,
        "nombre": "Eric",
        "email": "eric@correo.com"
    },
    {
        "id": 2,
        "nombre": "Lucía",
        "email": "lucia@email.'com"
    }
]```
