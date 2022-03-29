import { Link } from "react-router-dom";
import RecoveryForm from "./RecoveryForm";

const RecoveryScreen = () => {
  
  return (
    <div className="w-1/3 max-w-[407px] flex flex-col bg-white p-[30px] rounded-md">
      <h3 className="text-title font-medium text-primary-font-color mb-2">
        ¿Olvidaste tu contraseña?
      </h3>
      <p className="text-subtitle font-normal leading-5 text-gray">
        Ingresa tu correo electrónico y te enviaremos instrucciones para
        restablecer tu contraseña.
      </p>
      <RecoveryForm />
      <Link
        to="/auth"
        className="w-full flex justify-center text-blue-primary text-subtitle hover:text-blue-600"
      >
        Regresar
      </Link>
    </div>
  );
};

export default RecoveryScreen;
