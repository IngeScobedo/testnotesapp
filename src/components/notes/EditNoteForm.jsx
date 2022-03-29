import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote } from "../../reducers/slices/notes";
import ErrorMessage from "../auth/ErrorMessage";

const EditNoteForm = ({ setShowModal, defaultNote }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { id, title, content } = defaultNote;

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.login)

  const onSubmit = (data) => {
    const newNote = {
        id,
        title: data.title,
        content: data.content,
        user: user.name,
    }
    dispatch(editNote(newNote))
    setShowModal(false);
    };

  return (
    <div className=" pt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-2 px-5">
          <label className="text-text text-primary-font-color">
            Titulo de la nota
          </label>
          <input
            {...register("title", {
              required: {
                value: true,
                message: "El titulo es requerido",
              },
            })}
            defaultValue={title}
            className={
              errors.title
                ? "p-l-[17px] p-t-[14px] p-l-[12px] border border-red-primary rounded-lg text-[16px] text-red-primary focus:outline-none focus:border-gray placeholder-red-primary"
                : "p-l-[17px] p-t-[14px] p-l-[12px] border border-border-gray-light rounded-lg text-[16px] text-gray-light focus:outline-none focus:border-gray placeholder-gray-light"
            }
            type="text"
            placeholder="Ingresar Título"
          />
          {
            errors.title &&
            <ErrorMessage message={errors.title.message} />
          }
        </div>
        <div className="flex flex-col gap-2 mt-[22px] px-5">
          <label className="text-text text-primary-font-color">
            Cuerpo de la nota
          </label>
          <textarea
           className={
            errors.content
              ? "resize-none p-l-[17px] p-t-[14px] p-l-[12px] border border-red-primary rounded-lg text-[16px] text-red-primary  focus:border-red-primary placeholder-red-primary h-[132px]"
              : "resize-none p-l-[17px] p-t-[14px] p-l-[12px] border border-border-gray-light rounded-lg text-[16px] text-gray-light  focus:border-gray placeholder-gray-light h-[132px]"
          }
            {...register("content", {
              required: {
                value: true,
                message: "El cuerpo de la nota es requerido",
              },
            })}
            defaultValue={content}
            placeholder="Ingresa el cuerpo"
          />
           {
            errors.content &&
            <ErrorMessage message={errors.content.message} />
          }
        </div>
        <div className="flex items-center justify-end p-[14px] mt-8 border-t border-solid border-border-gray rounded-b">
          <button
            className="bg-[#3554D1] text-white text-subtitle px-[22px] py-[10px] rounded-[5px] shadow hover:shadow-lg outline-none font-medium"
            type="submit"
          >
            Añadir Nota
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoteForm;
