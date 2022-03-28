import { useSelector } from "react-redux";
import AddNote from "./AddNote";
import NavBar from "./NavBar";
import NotesLayout from "./NotesLayout";

const NotesScreen = () => {
  const { notes } = useSelector((state) => state.notes);
    
  return (
    <div className="w-full h-screen p-3">
      <NavBar />
      <AddNote />
      <NotesLayout notes={notes} />
    </div>
  );
};

export default NotesScreen;
