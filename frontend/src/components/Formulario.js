import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Formulario = () => {
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try { 
                const response = await axios.post('http://localhost:5000/submit', values);
                alert(response.data.message);
                resetForm();
            } catch (error) {
                console.error('Error al enviar el formulario:', error);
                alert('No se pudo enviar el formulario');
            }
        },
    });
    return(
        <form onSubmit={formik.handleSubmit}>
            <label>Nombre:</label>
            <input 
                type = "text"
                name = "nombre"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.nombre && formik.errors.nombre && <div>{formik.errors.nombre}</div>}

            <label>Email:</label>
            <input
                type = "email"
                name = "email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}

            <button type="submit">Enviar</button>
        </form>
    );
};

export default Formulario;