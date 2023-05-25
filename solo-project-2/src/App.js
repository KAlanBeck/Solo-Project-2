import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom"
import { Login } from "./pages/Login.js"
import { Signup } from "./pages/Signup.js"
import { Diary } from "./pages/Diary.js"


function App() {
  const [username, setUsername] = useState('');

  return (
    <div className="App">
      <nav>
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login setUsername={setUsername} />} />
        <Route path="/signup" element={<Signup setUsername={setUsername} />} />
        <Route path="/diary" element={<Diary setUsername={setUsername} />} />
      </Routes>
    </div>
  );
}

export default App;
