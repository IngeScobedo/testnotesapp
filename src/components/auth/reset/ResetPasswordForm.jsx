import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import useLogin from "../../../hooks/useLogin";

const ResetPasswordForm = () => {

  const { error, isLoading, isChangeSuccess } = useSelector(
    (state) => state.login
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const { onReset } = useLogin()

  return (
    <form onSubmit={handleSubmit(onReset)} className="flex flex-col w-full">
      <div className="">
        <label className="block text-text font-medium leading-5 text-gray">
          Nueva contraseña
        </label>
        <input
          {...register("newPassword", {
            required: {
              value: true,
              message: "La contraseña es requerida",
            },
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres.",
            },
            pattern: {
              value:
              /^(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
              message:
                "La contraseña debe tener al menos 8 caracteres, al menos una minúscula y al menos una mayúscula.",
            },
          })}
          autoComplete="off"
          type={"password"}
          autoFocus={true}
          //onFocus={}
          placeholder={"Ingresar nueva contraseña"}
          className={
            errors.newPassword || error
              ? "mt-1 w-full py-2 px-3 border border-red-primary rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-red-primary text-text text-red-primary font-normal"
              : "mt-1 w-full py-2 px-3 border border-border-gray-light rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-text text-primary-font-color font-normal placeholder-border-gray-light"
          }
        />
        {errors.newPassword && errors.newPassword.message && (
          <ErrorMessage message={errors.newPassword.message} />
        )}
        {error && <ErrorMessage message={error} />}
      </div>
      <div className="mt-5">
        <div className="w-full flex justify-between">
          <label className="inline-block text-text font-medium text-gray">
            Confirmar contraseña
          </label>
        </div>
        <input
          type={"password"}
          {...register("repeatPassword", {
            required: {
              value: {
                value: true,
                message: "La contraseña es requerida",
              },
            },
          })}
          placeholder={"Confirmar contraseña"}
          //onFocus={}
          className={
            error === "Las contraseñas no coinciden" || errors.repeatPassword
              ? "mt-1 w-full py-2 px-3 border border-red-primary rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-red-primary text-text text-red-primary font-normal"
              : "mt-1 w-full py-2 px-3 border border-border-gray-light rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-text text-primary-font-color placeholder-border-gray-light font-normal"
          }
        />
        {error === "Las contraseñas no coinciden" && (
          <ErrorMessage message={error} />
        )}
        {}
      </div>
      <button
        className={
          isChangeSuccess
            ? "w-full rounded-md h-[38px] my-4 bg-green-600 text-white text-subtitle"
            : isLoading
            ? "w-full rounded-md h-[38px] my-4 bg-orange-500 text-white text-subtitle"
            : "w-full rounded-md h-[38px] my-4 bg-blue-primary text-white text-subtitle"
        }
      >
        {isChangeSuccess
          ? "Cambio de contraseña exitoso"
          : isLoading
          ? "Cambiando contraseña..."
          : "Cambiar contraseña"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
