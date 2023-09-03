
import {Routes, Route} from "react-router-dom"
import Home from "./views/Home"
import Login from './views/Login';
import Singin from './views/Singin';
import NewInvitacion from './views/NewInvitacion';
import ProfileInvitaciones from './views/ProfileInvitaciones';
import EditarInvitaciones from './views/EditarInvitaciones';
import Navbar from './Components/Navbar';

function App() {


  return (
    <>
    <Navbar/>
    <div className="max-w-7xl px-4 mx-auto">

    <Routes>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/singin" element={<Singin/>}/>
      <Route exact path="/new" element={<NewInvitacion/>}/>
      <Route exact path="/profile" element={<ProfileInvitaciones/>}/>
      <Route exact path="/edit" element={<EditarInvitaciones/>}/>
    </Routes>
    </div>
    </>
  )
}

export default App
