import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeSuccess, loginError, loginPending, loginSuccess, recoverySuccess } from "../reducers/slices/login";
import { useLoginMutation, useRecoveryMutation, useResetMutation } from "../reducers/slices/login/login";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login] = useLoginMutation();
  const [recovery] = useRecoveryMutation();
  const [reset] = useResetMutation();

  const { token } = useSelector(state => state.login);

  const onLogin = async (e) => {
    dispatch(loginPending());
    const data = {
      email: e.email,
      password: e.password,
    };
    try {
      const payload = await login(data).unwrap();
      dispatch(loginSuccess(payload));
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.data.err === "There isn't a user with that email"
          ? "El correo electrónico no está asociado a ninguna cuenta."
          : error.data.err === "Incorrect password"
          ? "La contraseña ingresada es incorrecta."
          : "Ocurrió un error inesperado.";
      dispatch(loginError(errorMessage));
      setTimeout(() => {
        dispatch(loginError(null));
      }, 2500);
    }
  };
  const onRecovery = async (e) => {
    dispatch(loginPending());
    const data = {
      email: e.email,
    };
    try {
      const payload = await recovery(data).unwrap();
      dispatch(recoverySuccess(payload));
      setTimeout(() => {
        navigate("/auth/reset_password", { replace: true });
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.data.err === "There isn't a user with that email" &&
        "El correo electrónico no está asociado a ninguna cuenta.";
      dispatch(loginError(errorMessage));
      setTimeout(() => {
        dispatch(loginError(null));
      }, 2500);
    }
  };

  const onReset = async (e) => {
      const { newPassword, repeatPassword } = e
    dispatch(loginPending());
    if (newPassword !== repeatPassword) {
        dispatch(loginError("Las contraseñas no coinciden."));
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
  return {
    onLogin,
    onRecovery,
    onReset
  }
}

export default useLogin