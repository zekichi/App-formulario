// scr/components/layout.jsx

import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className='bg-[#fdf6e3] min-h-screen font-serif text-[#3c3c3c] px-6 py-10'>
            <header className='max-w-7xl mx-auto mb-8 border-b border-[#bfae9b] pb-4'>
                <div className='flex items-center space-x-3 mb-2'>
                    <span className='text-3xl'>✒️</span>
                    <h1 className='text-4xl text-[#7e4a35] font-bold drop-shadow-sm font-serif'>
                        QuLab Formulario Retro
                    </h1>
                    
                </div>
                <h2 className='text-lg md:text-xl font-light italic text-stone-600 mt-2 mb-4 text-center tracking-wide'>
                    Captura y organiza la información de manera eficiente
                </h2>
                <p className='text-[#8c715b] italic tracking-wide mb-2'>
                    Un formulario para capturar datos de manera sencilla y efectiva
                </p>
                <hr className='border-dotted border-[#bfae9b]' />
            </header>

            <main className='max-w-7xl mx-auto'>{children}</main>

            <footer className='max-w-7xl mx-auto mt-16 pt-6 border-t border-[#bfae9b] text-sm text-[#7e4a35]'>
                &copy; 2025 - Diseñado con cafe y QuLab ☕🧪💻
            </footer>
        </div>
    )
};

export default Layout;