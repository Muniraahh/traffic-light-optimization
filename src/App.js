// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';
import { EntryPoint } from './components/EntryPoint';
import Routers from './components/Routers';

function App() {
    return (
        <div className="App">
            <Routers />
            {/* <EntryPoint /> */}
            
            {/* <Dashboard /> */}

        </div>
    );
}

export default App;
