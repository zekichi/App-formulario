// src/App.jsx
import React from "react";
import Layout from "/components/Layout";
import Formulario from "/components/Formulario";
import ListadoFormularios from "/components/ListadoFormularios";

function App() {
  return (
    <Layout>
      <div className="mb-10">
        <Formulario />
        <hr className="my-6 border-[#bfae9b]" />
        <ListadoFormularios />
      </div>

      <div className="bg-blue-500 text-white p-6 rounded text-center text-lg">
        ¡Tailwind está funcionando! 🎉
      </div>
    </Layout>
  );
}

export default App;