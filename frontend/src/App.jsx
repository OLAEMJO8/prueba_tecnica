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

    <Route element={<InicioSesion isAllowed={!isAuth} redirectTo="/profile"/>}>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/singin" element={<Singin/>}/>
      
    </Route>
    <Route element={<InicioSesion isAllowed={isAuth} redirectTo="/login"/>}>
     
      <Route exact path="/profile" element={<ProfileInvitaciones/>}/>
      <Route exact path="/new" element={<NewInvitacion/>}/>
      
    </Route>
    </Routes>
    </div>
    </>
  );
}

export default App;
