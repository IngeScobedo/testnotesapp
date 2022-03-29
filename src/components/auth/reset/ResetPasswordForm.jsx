import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  loginError,
  loginPending,
  changeSuccess,
  resetRecoverySuccess,
} from "../../../reducers/slices/login";
import ErrorMessage from "../ErrorMessage";
import { useResetMutation } from "../../../reducers/slices/login/login";
import { useEffect } from "react";

const ResetPasswordForm = () => {
  const [reset] = useResetMutation();
  const dispatch = useDispatch();

  const { error, isLoading, token, isChangeSuccess } = useSelector(
    (state) => state.login
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatePasswords = (value) => {
    const password = value.repeatPassword;
    if (password === watch("newPassword")) {
      return true;
    }
    if (password !== watch("newPassword")) {
      return false;
    }
  };

  const onReset = async (e) => {
    dispatch(loginPending());
    if (!validatePasswords(e)) {
      dispatch(loginError("Las contraseñas no coinciden"));
      return;
    }
    const data = {
      password: e.newPassword,
      token: token,
    };
    try {
      await reset(data).unwrap();
    } catch (error) {
      const errorMessage =
        error.data.err ===
          "The new password can't be the same as the old password" &&
        "La contraseña nueva no puede ser igual a la anterior.";

      if (error.data === "ok") {
        dispatch(changeSuccess());
      }
      dispatch(loginError(errorMessage));
      setTimeout(() => {
        dispatch(loginError(null));
      }, 2500);
    }
  };

  useEffect(()=>{
    dispatch(resetRecoverySuccess())
  }, [])

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
              : "mt-1 w-full py-2 px-3 border border-border-gray-light rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-text text-border-gray-light font-normal placeholder-border-gray-light"
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
              : "mt-1 w-full py-2 px-3 border border-border-gray-light rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-text text-border-gray-light placeholder-border-gray-light font-normal"
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
