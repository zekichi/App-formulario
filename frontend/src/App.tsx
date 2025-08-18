import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Formulario from './components/Formulario';

function App() {

  return (
    <main className="min-h-screen flex items-center justify-center bg-fondo">
      <Formulario />
    </main>
  );
}

export default App;
