import React from "react";
import Formulario from "./components/Formulario";

function App() {
  return (
    <div className="App">
      <h1>Formulario de Contacto</h1>
      <Formulario />
    </div>
  );
}

import Formulario from "./components/Formulario";
import ListadoFormularios from "./components/ListadoFormularios";

function App(){
  return(
    <div>
      <h1>App de Formularios</h1>
      <Formulario />
      <hr />
      <ListadoFormularios />
    </div>
  )
}

export default App;
