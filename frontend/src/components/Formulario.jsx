import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Formulario = () => {
    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            mensaje: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatorio'),
            email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
            mensaje: Yup.string().required('El mensaje es obligatorio'),
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
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-6 max-w-xl mx-auto">
            <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-lg font-serif text-yellow-900 tracking-wide">Nombre:</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Ingresá tu nombre"
                        className="w-full mt-1 p-2 border border-yellow-300 rounded-md bg-yellow-100 text-yellow-900 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
                    />
                    {formik.touched.nombre && formik.errors.nombre && (
                    <p className="text-sm text-red-600 mt-1 italic">{formik.errors.nombre}</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-serif text-yellow-900 tracking-wide">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="ejemplo@correo.com"
                        className="w-full mt-1 p-2 border border-yellow-300 rounded-md bg-yellow-100 text-yellow-900 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-sm text-red-600 mt-1 italic">{formik.errors.email}</p>
                    )}
                </div>

                <div>
                    <label className="block text-lg font-serif text-yellow-900 tracking-wide">Mensaje:</label>
                    <textarea
                        name="mensaje"
                        value={formik.values.mensaje}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Escribí tu mensaje ..."
                        className="w-full mt-1 p-2 border border-yellow-300 rounded-md bg-yellow-100 text-yellow-900 placeholder-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-inner resize-none"
                    />
                    {formik.touched.mensaje && formik.errors.mensaje && (
                        <p className="text-sm text-red-600 mt-1 italic">{formik.errors.mensaje}</p>
                    )}
                </div>

                <button
                type="submit"
                className="mt-4 px-6 py-2 bg-yellow-600 text-yellow-50 font-bold rounded-full shadow-md hover:bg-yellow-700 transition-all duration-300"
                >
                Enviar
                </button>
            </form>
        </div>
    );
};

export default Formulario;