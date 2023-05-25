import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    return () => {
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "Application/JSON",
        },
        body: JSON.stringify({ username, password }),
      });
      

      if (response.ok) {
        setUsername(username);
        setLoggedIn(true);
      } else {

        console.log('error in handlelogin')
      }
    } catch (error) {

      console.log('err:', error)
    }
  };

  if (loggedIn) {
    return <Navigate to="/diary" state={{ username }}/>;
  }

  return (
    <form className='login' onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
