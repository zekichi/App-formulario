// src/components/Register.tsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Requerido'),
});

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate(); // Agregar este hook

  return (
    <div className="min-h-screen bg-fondo font-serif text-texto flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-blanco p-6 border border-borde rounded-lg shadow-sm">
        <h2 className="text-2xl mb-4 text-acento text-center">Crear cuenta</h2>
        <Formik
          initialValues={{ email: '', password: '', confirm: '' }}
          validationSchema={schema}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              await register(values.email, values.password);
              navigate('/login'); // Agregar esta línea
            } catch (err: any) {
              setFieldError('email', 'Ya existe ese email');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Email</label>
                <Field
                  name="email"
                  type="email"
                  className="w-full p-2 border border-borde rounded bg-fondo"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div>
                <label className="block text-sm mb-1">Contraseña</label>
                <Field
                  name="password"
                  type="password"
                  className="w-full p-2 border border-borde rounded bg-fondo"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <div>
                <label className="block text-sm mb-1">Confirmar contraseña</label>
                <Field
                  name="confirm"
                  type="password"
                  className="w-full p-2 border border-borde rounded bg-fondo"
                />
                <ErrorMessage name="confirm" component="div" className="text-red-600 text-sm mt-1" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-acento text-blanco py-2 rounded hover:opacity-90 transition"
              >
                {isSubmitting ? 'Cargando...' : 'Registrarse'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}