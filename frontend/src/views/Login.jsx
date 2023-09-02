//* Registro usuario
import Input from "../Components/Utils/Input";
import Card from "../Components/Utils/Card";
import Button from "../Components/Utils/Button";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:3000/api/login", data, {
     withCredentials:true
    });
    console.log(res);
  });
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        <form onSubmit={onSubmit}>
          <Input
            placeholder="Ingresa tu nombre"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="text-red-500">nombre es requerido</p>}
          <Input
            placeholder="Ingresa tu apellido"
            {...register("lastname", { required: true })}
          />
          {errors.lastname && (
            <p className="text-red-500">apellido es requerido</p>
          )}
          <Input
            type="email"
            placeholder="Correo electronico"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">email es requerido</p>}
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-red-500">contraseña es requerida</p>
          )}
          <Input
            placeholder="Direccion departamento"
            {...register("numberdpto", { required: true })}
          />
          {errors.dpto && (
            <p className="text-red-500">direccion es requerida</p>
          )}
          <Button> Registrarme</Button>
        </form>
      </Card>
    </div>
  );
}

export default Login;
