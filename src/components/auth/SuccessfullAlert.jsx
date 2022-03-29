import { useRef } from "react";
import { BsCheck2Circle } from "react-icons/bs";

const SuccessfullAlert = () => {
  const animTarget = useRef(null)

  setTimeout(() => {
    animTarget.current.classList.add("hidden")
  }, 2500)

  return (
    <div
      ref={animTarget}
      className="absolute top-28 right-0 bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md animate-bounce"
      role="alert"
    >
      <div className="flex">
        <BsCheck2Circle />
        <div>
          <p className="font-bold">La contraseña fue cambiada correctamente</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullAlert;
