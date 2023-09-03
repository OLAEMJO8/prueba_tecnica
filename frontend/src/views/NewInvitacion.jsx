import { useForm } from "react-hook-form";
import Card from "../Components/Utils/Card";
import Button from "../Components/Utils/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Input from "../Components/Utils/Input";
import { createInvitacionRequest } from "../api/task.api";

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
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };
  
    const formData = {
      name: data.name,
      timein: formatDate(fechaEntrada), // Ajusta el nombre del campo a "timein"
      timeout: formatDate(fechaSalida), // Ajusta el nombre del campo a "timeout"
    };
  console.log(formData)
    const res = await createInvitacionRequest(formData)
  console.log(res)
});
  

  return (
    <div className="flex h-[80vh] justify-center items-center">
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

          <label>Fecha y Hora de salida</label>
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
