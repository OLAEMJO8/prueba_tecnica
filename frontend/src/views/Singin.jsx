import Input from "../Components/Utils/Input";
import Card from "../Components/Utils/Card";
import Button from "../Components/Utils/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Singin() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const { singin,  errors} = useAuth();

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const user = await singin(data);
    if (user) {
      navigate("/profile");
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex items-center justify-center">
      <Card>
    
        {errors && errors.map(err=>(<p className="bg-red-500 text-center">{err}</p>))}
        <h1 className="text-4xl font-bold my-2 text-center">Sign in</h1>
        <form onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="Correo electronico"
            {...register("email", { required: true })}
          />
          {/* {errors.email && <p className="text-red-500">email es requerido</p>} */}
          <Input
            type="password"
            placeholder="Contraseña"
            {...register("password", { required: true })}
          />
          {/* {errors.password && (
            <p className="text-red-500">contraseña es requerida</p>
          )} */}

          <Button>Iniciar sesion</Button>
          <div className="flex justify-between my-4">
            <p className="mr-4">No tienes cuenta?</p>
            <Link to="/login" className="font-bold">
              Register
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Singin;
