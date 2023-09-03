import React, { useState, useEffect } from "react";
import moment from "moment";
import QRCode from "react-qr-code";
import Card from "../Components/Utils/Card";
import Button from "../Components/Utils/Button";

import { getInvitacionRequest } from "../api/task.api";

function ProfileInvitaciones() {
  const [invs, setInvs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    getInvitacionRequest().then((response) => {
      setInvs(response.data);
    });
  }, []);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/yyyy HH:mm");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvs = invs.slice(indexOfFirstItem, indexOfLastItem);

  const jsonDataArray = currentInvs.map((inv) => {
    const invitationData = {
      id: inv.id,
      name: inv.name,
      timein: formatDate(inv.timein),
      timeout: formatDate(inv.timeout),
    };

    return JSON.stringify(invitationData);
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-7 py-4 flex flex-col justify-center gap-2">
      <div className="flex justify-center mt-4">
        <button
          className={
            "relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          }
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {Array.from(
          { length: Math.ceil(invs.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-indigo-500 text-white rounded-md"
                  : "bg-white text-indigo-500 hover:bg-blue-200 rounded-md"
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
        <button
          className={
            "relative inline-flex items-cenrer gap-x-1.5 rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          }
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(invs.length / itemsPerPage)}
        >
          Siguiente
        </button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {currentInvs.map((inv, index) => (
          <div key={inv.id}>
            <Card className="flex flex-col items-center">
              <h1 className="uppercase font-bold text-3xl flex justify-center ">
                {inv.name}
              </h1>
              <div className="flex justify-center gap-2 mt-4">
                <div
                  className={
                    "relative inline-flex items-center gap-x-1.5 rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold text-white "
                  }
                >
                  <div className="flex flex-col text-center">
                    <p>Fecha de entrada</p>
                    <p>{formatDate(inv.timein)}</p>
                  </div>
                </div>
                <div
                  className={
                    "relative inline-flex items-center gap-x-1.5 rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white "
                  }
                >
                  <div className="flex flex-col text-center">
                    <p>Fecha de salida</p>
                    <p>{formatDate(inv.timeout)}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <QRCode value={jsonDataArray[index]} size={120} />
              </div>
              <div className="my-2 flex justify-center gap-x-2 py-2">
                <Button>Editar</Button>
                <Button>
                  Eliminar
                </Button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileInvitaciones;
