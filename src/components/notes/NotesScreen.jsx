import { useSelector } from "react-redux";
import AddNote from "./AddNote";
import NavBar from "./NavBar";
import NotesLayout from "./NotesLayout";

const NotesScreen = () => {
  const { isAuthenticated } = useSelector(state => state.login);
  return (
    <div className="w-full h-screen p-3">
      
      {
        isAuthenticated 
          ? (
          <>
            <NavBar />
            <AddNote />
            <NotesLayout />
          </>
          ) : null
      }
    </div>
  );
};

export default NotesScreen;
