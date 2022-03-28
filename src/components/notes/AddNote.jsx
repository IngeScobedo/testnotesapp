import React, { useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import AddNoteForm from "./AddNoteForm";

export default function AddNote() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full max-h-[45px] flex justify-center my-7">
      <button
        className="
        max-w-[172px] h-full bg-white p-2 flex justify-center items-center gap-[12px] bg-gradient-45 from-purple-primary via-purple-primary to-purple-secondary text-white  text-text px-6 py-3 rounded-md shadow-md hover:bg-purple-primary hover:text-white focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <FiPlusCircle size={"15px"} color="white" />
        Agregar Nota
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-2/3 max-w-[450px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-center justify-between p-[15px] bg-background-color rounded-t-lg">
                  <div className="flex items-center gap-3" >
                    <FiPlusCircle size={"18px"} color="black" />
                    <h3 className="text-title font-semibold">Agregar Nota</h3>
                  </div>
                  <button
                    className="relative left-[20px] top-[-21px] shadow flex justify-center items-center bg-white w-[34px] h-[34px] rounded-md text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <IoMdClose size={"20px"} color="black" />
                  </button>
                </div>
                {/*body*/}
                <AddNoteForm setShowModal={setShowModal} />
                {/*footer*/}
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
