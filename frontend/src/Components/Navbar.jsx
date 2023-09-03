import { Link } from "react-router-dom";

const navigation = [
  {
    name: "Home",
    path: "/home",
  },
  {
    name: "Login",
    path: "/login",
  },
  {
    name: "Registro",
    path: "/singin",
  },
  {
    name: "Invitacion",
    path: "/new",
  },
  {
    name: "Perfil",
    path: "/profile",
  },
  {
    name: "Cambiar invitacion",
    path: "/edit",
  },
];

function Navbar() {
  return (
    <nav className="bg-gray-800 ">
      <div className="max-w-7xl px-4 mx-auto ">
        <div className="flex justify-between  py-3">
        <h1 className="font-bold text-2xl">Nextia</h1>
          <ul className="flex gap-x-2">
            {navigation.map(({ path, name }) => (
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
