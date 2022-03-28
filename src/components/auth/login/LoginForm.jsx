import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import { loginError, loginPending, loginSuccess } from "../../../reducers/slices/login";
import { useLoginMutation } from "../../../reducers/slices/login/login";
import { usersSuccess } from "../../../reducers/slices/users";

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const { 
    error, 
    isAuthenticated, 
    isLoading 
  } = useSelector((state) => state.login);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  
  const onLogin = async (e) => {
    dispatch(loginPending())
    const data = {
      email: e.email,
      password: e.password
    }
    try {
      const payload = await login(data).unwrap()
      dispatch(loginSuccess(payload))
      dispatch(usersSuccess(payload))
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 2500)
    } catch (error) {
      const errorMessage = ( 
        error.data.err === "There isn't a user with that email" 
        )
          ? "El correo electrónico no está asociado a ninguna cuenta."
          : (error.data.err === "Incorrect password")
            ? "La contraseña ingresada es incorrecta."
            : "Ocurrió un error inesperado."
      dispatch(loginError(errorMessage))
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="w-full flex flex-col justify-center"
    >
      <div className="mt-5">
        <label className="block text-text font-medium leading-5 text-gray">
          Correo Electrónico
        </label>
        <input
          {...register("email", {
            required: {
              value: true,
              message: "El correo es requerido",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Ingresa un correo electrónico válido.",
            },
          })}
          autoComplete="on"
          type={"text"}
          autoFocus={true}
          placeholder={"Ingresa tu Correo Electrónico"}
          className={
            (errors.email || (error === "El correo electrónico no está asociado a ninguna cuenta."))
              ? "mt-1 w-full py-2 px-3 border border-red-primary rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-red-primary text-text text-red-primary font-normal"
              : "mt-1 w-full py-2 px-3 border border-border-gray-light rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-text text-border-gray-light font-normal"
          }
        />
        {
        errors.email && errors.email.message && (
          <ErrorMessage message={errors.email.message} />
        )
        }
        {
          (error === "El correo electrónico no está asociado a ninguna cuenta.") && (
            <ErrorMessage message={error} />
          )
        }
        {}
      </div>
      <div className="mt-3">
        <div className="w-full flex justify-between">
          <label className="inline-block text-text font-medium leading-5 text-gray">
            Contraseña
          </label>
          <Link
            to={"recovery"}
            className="inline-block align-baseline font-normal text-text text-blue-primary hover:text-blue-800 mr-3"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <input
          type={"password"}
          {...register("password", {
            required: {
                value: true,
                message: "La contraseña es requerida",
            },
            minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
            }
          })}
          placeholder={"Ingresa tu Contraseña"}
          //onFocus={}
          className={
            (errors.password || (error === "La contraseña ingresada es incorrecta."))
                ? "mt-1 w-full py-2 px-3 border border-red-primary rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-red-primary text-text text-red-primary font-normal"
                : "mt-1 w-full py-2 px-3 border border-border-gray-light rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-text text-border-gray-light font-normal"
          }
        />
        {
        errors.password && errors.password.message && (
          <ErrorMessage message={errors.password.message} />
        )
        }
        {
          (error === "La contraseña ingresada es incorrecta.") && (
            <ErrorMessage message={error} />
          )
        }
      </div>
      <button className={
        (isAuthenticated)
          ? "w-full rounded-md h-[38px] mt-[30px] bg-green-600 text-white text-subtitle"
          : isLoading 
            ? "w-full rounded-md h-[38px] mt-[30px] bg-orange-400 text-white text-subtitle"
            : "w-full rounded-md h-[38px] mt-[30px] bg-blue-primary text-white text-subtitle"
      }>
        {
          isAuthenticated
            ? "Redirigiendo..."
            : isLoading
              ? "Iniciando Sesión..."
              : "Iniciar Sesión"
        }
      </button>
    </form>
  );
};

export default LoginForm;
