// scr/components/layout.jsx

import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className='bg-[#fdf6e3] min-h-screen font-serif text-[#3c3c3c] px-6 py-10'>
            <header className='max-w-7xl mx-auto mb-8 border-b border-[#bfae9b] pb-4'>
                <h1 className='text-4xl text-[#7e4a35] font-bold'>App Retro</h1>
            </header>

            <main className='max-w-7xl mx-auto'>{children}</main>

            <footer className='max-w-7xl mx-auto mt-16 pt-6 border-t border-[#bfae9b] text-sm text-[#7e4a35]'>
                &copy; 2025 - Diseñado con cafe y QuLab ☕🧪💻
            </footer>
        </div>
    )
}