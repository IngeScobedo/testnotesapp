import AddNote from "./AddNote";
import NavBar from "./NavBar";
import NotesLayout from "./NotesLayout";

const NotesScreen = () => {
    
  return (
    <div className="w-full h-screen p-3">
      <NavBar />
      <AddNote />
      <NotesLayout />
    </div>
  );
};

export default NotesScreen;
