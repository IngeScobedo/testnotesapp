import { MdClose } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { memo, useState } from "react";
import AddNoteForm from "./AddNoteForm";
import EditNoteForm from "./EditNoteForm";
import { deleteNote } from "../../reducers/slices/notes";

const Note = memo(({ id, title, content }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const defaultNote = {
    id,
    title,
    content,
  };

  const handleDelete = () => {
    dispatch(deleteNote(id));
  };
  return (
    <>
      <div className="w-full flex flex-col md:max-w-[448px] bg-white rounded-md">
        <div className="w-full flex justify-between text-primary-font-color font-medium px-4 pt-4 ">
          <h2 className="max-w-[320px] max-h-10 break-words truncate">
            {title}
          </h2>
          <div className="flex justify-center gap-3">
            <button
              className="rounded-full w-[34px] h-[34px] hover:bg-gray-light flex justify-center items-center"
              onClick={() => setShowModal(true)}
            >
              <FiEdit2 color="#6E6B7B" size={"24px"} />
            </button>
            <button
              className="rounded-full w-[34px] h-[34px] hover:bg-gray-light flex justify-center items-center"
              onClick={handleDelete}
            >
              <MdClose color="#6E6B7B" size={"24px"} />
            </button>
          </div>
        </div>
        <hr className="w-full text-gray-light mt-[10px] mb-[15px]" />
        <div className="max-w-[448px] h-auto px-4 pb-4 text-gray text-ellipsis overflow-">
          <p className="max-w-[425px] break-words">{content}</p>
        </div>
      </div>
      <div className={showModal ? "" : "hidden"}>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="w-2/3 max-w-[450px]">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-center justify-between p-[15px] bg-background-color rounded-t-lg">
                    <div className="flex items-center gap-3">
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
                  <EditNoteForm
                    setShowModal={setShowModal}
                    defaultNote={defaultNote}
                  />
                  {/*footer*/}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
});

export default Note;
