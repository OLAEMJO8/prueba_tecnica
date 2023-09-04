
import {Routes, Route} from "react-router-dom"
import Home from "./views/Home"
import Login from './views/Login';
import Singin from './views/Singin';
import NewInvitacion from './views/NewInvitacion';
import ProfileInvitaciones from './views/ProfileInvitaciones';
import Navbar from './Components/Navbar';
import { InicioSesion } from "./Components/InicioSesion";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuth} = useAuth();

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl px-4 mx-auto">

    <Routes>

    <Route element={<InicioSesion isAllowed={!isAuth} redirectTo="/profile"/>}>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/home/login" element={<Login/>}/>
      <Route exact path="/home/singin" element={<Singin/>}/>
      
    </Route>
    <Route element={<InicioSesion isAllowed={isAuth} redirectTo="/login"/>}>
     
      <Route exact path="/home/profile" element={<ProfileInvitaciones/>}/>
      <Route exact path="/home/new" element={<NewInvitacion/>}/>
      
    </Route>
    </Routes>
    </div>
    </>
  )
}

export default App
