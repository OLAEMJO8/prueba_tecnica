import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getInvitacionRequest } from "../api/task.api";
import Card from "./../Components/Utils/Card";
import moment from "moment";
import Button from "../Components/Utils/Button";

function ProfileInvitaciones() {
  const [invs, setInvs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Cambia esto según tus necesidades

  useEffect(() => {
    getInvitacionRequest().then((response) => {
      setInvs(response.data);
    });
  }, []);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/yyyy HH:mm:ss A"); // Elige el formato deseado
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvs = invs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-7 py-4 flex flex-col justify-center">
     
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {currentInvs.map((inv) => (
            <Card key={inv.id}>
              <h1 className="text-2xl font-bold">{inv.name}</h1>
              <h1>{formatDate(inv.timein)}</h1>
              <h1>{formatDate(inv.timeout)}</h1>
              <div className="my-2 flex justify-center gap-x-2 py-2">
                <Button>Editar</Button>
                <Button className="bg-red-700 hover:bg-red-600">Eliminar</Button>
              </div>
            </Card>
          ))}
        </div>
      

      <div className="flex justify-center mt-4">
        <button
         className={"relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from({ length: Math.ceil(invs.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ?  "bg-indigo-500 text-white rounded-md"
                : "bg-white text-indigo-500 hover:bg-blue-200 rounded-md"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={"relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(invs.length / itemsPerPage)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default ProfileInvitaciones;
