import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ResetPasswordForm from "./ResetPasswordForm";

const ResetPasswordScreen = () => {
  const { isChangingPassword } = useSelector((state) => state.login);

  const navigate = useNavigate();

  useEffect(() => {
    if(!isChangingPassword){
      navigate("/auth", { replace: true });
    }
  }, [isChangingPassword]);
  return (
    <div className="w-1/3 max-w-[407px] flex flex-col bg-white p-[30px] rounded-md">
      <h3 className="text-title font-medium text-primary-font-color mb-2">
        Restablecer Contraseña
      </h3>
      <p className="text-subtitle font-normal text-gray mb-[23px]">
        Establece tu nueva contraseña y guárdala en un lugar seguro.
      </p>
      <ResetPasswordForm />
      <Link
        to={"/auth"}
        className="text-center text-subtitle text-blue-primary hover:text-blue-600"
      >
        Regresar
      </Link>
    </div>
  );
};

export default ResetPasswordScreen;
