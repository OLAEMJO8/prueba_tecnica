import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Singin from "./views/Singin";
import NewInvitacion from "./views/NewInvitacion";
import ProfileInvitaciones from "./views/ProfileInvitaciones";
import Navbar from "./Components/Navbar";
import { InicioSesion } from "./Components/InicioSesion";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          element={<InicioSesion isAllowed={!isAuth} redirectTo="/profile" />}
        >
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/singin" element={<Singin />} />
        </Route>
        <Route
          element={<InicioSesion isAllowed={isAuth} redirectTo="/login" />}
        >
          <Route path="/profile" element={<ProfileInvitaciones />} />
          <Route path="/new" element={<NewInvitacion />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
