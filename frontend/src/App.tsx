// frontend/App.tsx

import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import type { JSX } from 'react/jsx-dev-runtime';
import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
// import NewForm from './components/NewForm';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to ="/login" />;
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="forms/new"
            element={<PrivateRoute><NewForm /></PrivateRoute>}
          />
        </Routes>
      </BrowserRoutes>
    </AuthProvider>
  );
}
