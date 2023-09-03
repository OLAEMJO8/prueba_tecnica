//* Registro usuario
import Input from "../Components/Utils/Input";
import Card from "../Components/Utils/Card";
import Button from "../Components/Utils/Button";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    await login(data);
    navigate("/profile");
  });
  return (
    <div className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">Login</h1>
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
          <div className="flex justify-between my-4">
            <p className="mr-4">Estas registrado?</p>
            <Link to="/singin" className="font-bold">
              Inicia sesion
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Login;
