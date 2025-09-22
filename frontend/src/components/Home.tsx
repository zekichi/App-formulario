// src/components/Home.tsx
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-hero">
            <Navigation />
            
            {/* Hero Section */}
            <div className="container py-20">
                <div className="text-center fade-in">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        Crea formularios
                        <span className="text-gradient block mt-2">
                            profesionales
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Diseña encuestas personalizadas, recopila respuestas en tiempo real 
                        y analiza los datos con herramientas intuitivas y profesionales.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Link
                            to="/register"
                            className="btn btn-primary btn-lg px-8 py-4 text-lg hover-lift"
                        >
                            Comenzar Gratis
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link
                            to="/login"
                            className="btn btn-secondary btn-lg px-8 py-4 text-lg hover-lift"
                        >
                            Iniciar Sesión
                        </Link>
                    </div>

                    {/* Demo image placeholder */}
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl shadow-strong p-1">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500 font-medium">Vista previa del formulario</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-white py-20">
                <div className="container">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Todo lo que necesitas para crear formularios
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Herramientas profesionales que te permiten crear, compartir y analizar formularios de manera eficiente.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {{
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                                    </svg>
                                ),
                                title: "Fácil de usar",
                                description: "Interfaz intuitiva que permite crear formularios complejos en minutos, sin conocimientos técnicos."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                                title: "Análisis en tiempo real",
                                description: "Visualiza las respuestas con gráficos interactivos y exporta reportes detallados."
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                ),
                                title: "Seguro y confiable",
                                description: "Tus datos están protegidos con encriptación avanzada y respaldos automáticos."
                            }
                        }.map((feature, index) => (
                            <div key={index} className="text-center card card-body hover-lift">
                                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-600">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-primary py-20">
                <div className="container text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        ¿Listo para comenzar?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                        Únete a miles de usuarios que ya crean formularios profesionales con nuestra plataforma.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-medium hover:shadow-strong"
                    >
                        Crear cuenta gratuita
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-12">
                <div className="container text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">F</span>
                        </div>
                        <span className="font-serif font-bold text-xl text-white">
                            FormBuilder
                        </span>
                    </div>
                    <p className="text-gray-400">
                        © 2025 FormBuilder. Creado por Ezequiel Quintana
                    </p>
                </div>
            </footer>
        </div>
    );
}