import "./App.css";
import "typeface-roboto";
import { Route, Routes } from "react-router-dom";
import Authentication from "./components/Authentication";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route
        path='/register'
        element={<Authentication type='Register' />}
      ></Route>
      <Route
        path='/login'
        element={<Authentication type='Login' />}
      ></Route>
      <Route path='/dashboard'></Route>
    </Routes>
  );
}

export default App;
