import { useForm } from "react-hook-form";
import Card from "../Components/Utils/Card";
import Button from "../Components/Utils/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Input from "../Components/Utils/Input";
import { createInvitacionRequest } from "../api/task.api";
import moment from "moment"; // Agrega la importación de moment

function NewInvitacion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fechaEntrada, setFechaEntrada] = useState(new Date());
  const [fechaSalida, setFechaSalida] = useState(new Date());

  const onChangeEntrada = (selectedFecha) => {
    setFechaEntrada(selectedFecha);
  };

  const onChangeSalida = (selectedFecha) => {
    setFechaSalida(selectedFecha);
  };

  const onSubmit = handleSubmit(async (data) => {
    const formatDate = (date) => {
      const formattedDate = moment(date).format("YYYY-MM-DD HH:mm:ss"); // Formatea la fecha usando moment
      return formattedDate;
    };

    const formData = {
      name: data.name,
      timein: formatDate(fechaEntrada), // Formatea la fecha de entrada
      timeout: formatDate(fechaSalida), // Formatea la fecha de salida
    };

    console.log(formData);
    const res = await createInvitacionRequest(formData);
    console.log(res);
  });

  return (
    <div className="h-[calc(100vh-5rem)] flex items-center justify-center">
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
