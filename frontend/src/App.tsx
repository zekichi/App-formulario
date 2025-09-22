// src/App.tsx

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NewForm from './components/NewForm';
import FormView from './components/FormView';
import PublicForm from './components/PublicForm';

export default function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="min-h-screen bg-gray-50">
                    <Routes>
                        {/* Rutas públicas */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/form/:formId" element={<PublicForm />} />
                        
                        {/* Rutas protegidas */}
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/forms/new"
                            element={
                                <PrivateRoute>
                                    <NewForm />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/form/:formId/view"
                            element={
                                <PrivateRoute>
                                    <FormView />
                                </PrivateRoute>
                            }
                        />
                        
                        {/* Ruta por defecto */}
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

