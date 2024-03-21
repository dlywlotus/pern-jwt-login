import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type props = {
  type: string;
};

export default function Authentication({ type }: props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onLogin() {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(`${data}`);
        throw new Error(data);
      }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function onRegister() {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(`${data}`);
        throw new Error(data);
      }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='auth-modal'>
      <h2>{type}</h2>
      <input
        type='text'
        placeholder='username'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type='text'
        placeholder='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {type === "Login" && (
        <div className='space-between small-text'>
          <div className='remember-info'>
            <input type='checkbox' />
            <span>Remember me</span>
          </div>
          <Link to='/reset_password'>Forgot password ? </Link>
        </div>
      )}
      <button
        className='btn-auth'
        onClick={type === "Login" ? onLogin : onRegister}
      >
        {type}
      </button>
      {type === "Login" && (
        <Link to='/register' className='small-text'>
          Don't have an account ? &nbsp; Register now
        </Link>
      )}
      {error && <span className='error'>{error}</span>}
    </div>
  );
}
