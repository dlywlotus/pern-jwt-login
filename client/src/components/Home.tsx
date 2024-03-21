import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: `${localStorage.getItem("token")} `,
          },
        });
        if (!ignore) {
          const data = await res.json();
          if (!res.ok) throw new Error(data);
          setIsAuthenticated(data);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.log(error);
      }
    };
    getData();

    return () => {
      ignore = true;
    };
  }, []);

  function onLogout() {
    localStorage.setItem("token", "");
    setIsAuthenticated(false);
  }

  return (
    <>
      <h2>Your information</h2>
      {isAuthenticated && <Dashboard />}
      {isAuthenticated ? (
        <button className='btn-logout' onClick={onLogout}>
          Logout
        </button>
      ) : (
        <button
          className='btn-auth'
          onClick={() => navigate("/login")}
        >
          Login to see
        </button>
      )}
    </>
  );
}
