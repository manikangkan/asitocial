import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Messenger from "./pages/Messenger";
import Error from "./components/Error";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const { state } = useContext(AuthContext);
  // !state.user && <Login />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={state.user ? <Home /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile/:username"
          element={state.user ? <Profile /> : <Login />}
        />
        <Route
          path="/messenger"
          element={state.user ? <Messenger /> : <Login />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
