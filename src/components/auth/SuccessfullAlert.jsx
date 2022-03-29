import { BsCheck2Circle } from "react-icons/bs";

const SuccessfullAlert = () => {
    return (
        <div class="relative bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <BsCheck2Circle />
    <div>
      <p class="font-bold">La contraseña fue cambiada correctamente</p>
    </div>
  </div>
</div>
    )
}

export default SuccessfullAlert