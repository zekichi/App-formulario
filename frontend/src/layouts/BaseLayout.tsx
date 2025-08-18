// scr/layouts/BaseLayout.tsx

import React from "react";

type BaseLayoutProps = {
    children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
    return(
        <div className="min-h-screen bg-fondo font-serif text-texto flex flex-col">
            <header className="text-center py-6 shadow-md bg-white">
                <h1 className="text-2xl">Formulario</h1>
            </header>
            <main className="flex-grow flex items-center justify-center">
                {children}
            </main>
            <footer className="text-center py-4 text-sm opacity-60">
                © 2025 - Proyecto de ejemplo
            </footer>
        </div>
    )
};

export default BaseLayout;