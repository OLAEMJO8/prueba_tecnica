import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const navigationPublica = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Registro",
    path: "/singin",
  }
];
const navigationPrivada = [

  {
    name: "Nueva invitacion",
    path: "/new",
  },
  {
    name: "Mis invitaciones",
    path: "/profile",
  },
 
];

function Navbar() {
  const{isAuth, logout}=useAuth()
  return (
    <nav className="bg-gray-900 ">
      <div className="max-w-7xl px-4 mx-auto ">
        <div className="flex justify-between  py-3">
        <h1 className="font-bold text-2xl text-[#FA573E]">Prueba tecnica</h1>
          <ul className="flex gap-x-2">
            {isAuth? 
            <>
            
            {navigationPrivada.map(({ path, name }) => (
              <li
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                key={path}
              >
                <Link to={path}>{name}</Link>
              </li>
            )) }
             <li onClick={()=>{logout()}}  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            Logout
            </li>
            </>
            
            
            : navigationPublica.map(({ path, name }) => (
              <li
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                key={path}
              >
                <Link to={path}>{name}</Link>
              </li>
            ))}

           
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
