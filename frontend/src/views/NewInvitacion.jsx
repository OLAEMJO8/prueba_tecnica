import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createInvitacionRequest } from "../api/task.api";
import moment from "moment";
import  Input  from '../Components/Utils/Input';
import Button from "../Components/Utils/Button";
import Card from "../Components/Utils/Card";
import QRCode from "react-qr-code";

function NewInvitacion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fechaEntrada, setFechaEntrada] = useState(new Date());
  const [fechaSalida, setFechaSalida] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const onChangeEntrada = (selectedFecha) => {
    setFechaEntrada(selectedFecha);
  };

  const onChangeSalida = (selectedFecha) => {
    setFechaSalida(selectedFecha);
  };

  const onSubmit = handleSubmit(async (data) => {
    const formatDate = (date) => {
      const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
      return formattedDate;
    };

    const formData = {
      name: data.name,
      timein: formatDate(fechaEntrada),
      timeout: formatDate(fechaSalida),
    };

    console.log(formData);
    const res = await createInvitacionRequest(formData);
    console.log(res);

    setModalData(formData);
    setIsModalOpen(true);
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center">
      <div id="defaultModal" className={`fixed top-5 left-50 z-50 ${isModalOpen ? "" : "hidden"}`}>
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Invitación Enviada</h3>
              <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={closeModal}>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-6 space-y-6 items-start justify-center ">
              <p>Nombre del invitado: {modalData.name}</p>
              <p>Fecha y Hora de Entrada: {modalData.timein}</p>
              <p>Fecha y Hora de Salida: {modalData.timeout}</p>
              <QRCode value={modalData} size={120} />
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <Card>
        <form onSubmit={onSubmit}>
          <h1 className="text-4xl font-bold my-2 text-center">Invitacion</h1>

          <label>Nombre del invitado</label>
          <Input
            type="text"
            placeholder="Nombre"
            autoFocus
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && (
            <span className="text-red-500">Nombre es requerido</span>
          )}
          <br />

          <label>Fecha y Hora de entrada</label>
          <br />
          <DatePicker
            selected={fechaEntrada}
            onChange={onChangeEntrada}
            showTimeInput
            timeInputLabel="Hora:"
            dateFormat="dd/MM/yyyy h:mm aa"
            className="bg-zinc-800 px-3 py-2 block my-2 w-full"
          />
          <br />
          <br />
          <label>Fecha y Hora de salida</label>
          <br />
          <DatePicker
            selected={fechaSalida}
            onChange={onChangeSalida}
            showTimeInput
            timeInputLabel="Hora:"
            dateFormat="dd/MM/yyyy h:mm aa"
            className="bg-zinc-800 px-3 py-2 block my-2 w-full"
          />
          <br />
          <br />
          <Button type="submit">Enviar</Button>
        </form>
      </Card>
     
    </div>
  );
}

export default NewInvitacion;
