import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import useLogin from "../../../hooks/useLogin";
import {
  loginError,
  resetRecoverySuccess
} from "../../../reducers/slices/login";
import ErrorMessage from "../ErrorMessage";

const RecoveryForm = () => {  
  const dispatch = useDispatch();
  const { error, isRecoverySuccess, isLoading } = useSelector(state => state.login)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onRecovery } = useLogin()

  useEffect(() => {
    return () => {
      dispatch(resetRecoverySuccess())
      dispatch(loginError(null));
    }
  }, [])

  return (
    <form onSubmit={handleSubmit(onRecovery)} className="flex flex-col w-full mb-4">
      <div className="mb-4 mt-5">
        <label className="block text-text leading-5 text-gray mb-1">
          Correo Electrónico
        </label>
        <input
          {...register("email", {
            required: {
              value: true,
              message: "El correo electrónico es requerido",
            },
            minLength: {
              value: 6,
              message: "El correo electrónico debe tener al menos 6 caracteres",
            },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Ingresa un correo electrónico válido.",
            },
          })}
          autoComplete="off"
          type={"text"}
          autoFocus={true}
          placeholder={"Ingresa tu Correo Electrónico"}
          
          className={
            errors.email || error
              ? "border border-red-primary focus:border-red-primary focus:outline-none focus:shadow-outline-red-primary appearance-none w-full py-2 px-4 text-text leading-normal rounded-lg text-red-primary"
              : "border border-border-gray-light placeholder-border-gray-light focus:outline-none focus:shadow-outline-blue  appearance-none w-full py-2 px-4 text-text text-primary-font-color leading-normal rounded-lg"
          }
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
        {
          (error === "El correo electrónico no está asociado a ninguna cuenta.") && <ErrorMessage message={'Ingresa un correo electrónico válido.'} />
        }
        {error && <ErrorMessage message={error} />}
      </div>
      <button className={
        isRecoverySuccess
          ? "w-full rounded-md h-[38px] bg-green-500 text-white text-subtitle tracking-[0.4px] py-[10px]"
          : isLoading
          ? "w-full rounded-md h-[38px] bg-orange-400 text-white text-subtitle tracking-[0.4px] py-[10px]"
          : "w-full rounded-md h-[38px] bg-blue-primary text-white text-subtitle tracking-[0.4px] py-[10px]"
      }>
        {
          isRecoverySuccess
            ? "Redireccionando..."
            : isLoading
              ? "Validando información..."
              : "Enviar instrucciones"
        }
      </button>
    </form>
  );
};

export default RecoveryForm;
