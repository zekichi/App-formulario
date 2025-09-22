import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { token, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-soft">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-serif font-bold text-xl text-gray-900">
              FormBuilder
            </span>
          </Link>

          {/* Navigation Links */}
          {token ? (
            <div className="flex items-center space-x-1">
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/forms/new"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive('/forms/new')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Crear Formulario
              </Link>
              <div className="h-6 w-px bg-gray-300 mx-2"></div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="btn btn-primary"
              >
                Crear Cuenta
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}