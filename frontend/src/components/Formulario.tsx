import { useState } from 'react';

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Podés agregar lógica de envío aquí
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-gris shadow-md rounded-md space-y-4 font-serif"
    >
      <h2 className="text-2xl text-acento mb-4">Formulario de contacto</h2>

      <div>
        <label className="block text-sm mb-1" htmlFor="nombre">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full p-2 border border-sombra rounded bg-fondo text-texto"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border border-sombra rounded bg-fondo text-texto"
          required
        />
      </div>

      <div>
        <label className="block text-sm mb-1" htmlFor="mensaje">Mensaje</label>
        <textarea
          name="mensaje"
          id="mensaje"
          rows="4"
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full p-2 border border-sombra rounded bg-fondo text-texto"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-acento text-fondo px-4 py-2 rounded hover:opacity-90 transition"
      >
        Enviar
      </button>
    </form>
  );
}