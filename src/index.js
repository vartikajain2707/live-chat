import React from 'react';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DemoPage from './components/DemoPage';

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}>
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="demo" element={<DemoPage />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
</Provider>);

