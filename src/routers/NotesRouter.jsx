import { Route, Routes } from "react-router-dom"
import NotesScreen from "../components/notes/NotesScreen"
import AuthRouter from "./AuthRouter"

const NotesRouter = () => {
    
    return (
        <Routes>
            <Route path="/" element={<NotesScreen />} />
            <Route path="/auth" element={<AuthRouter />} />
        </Routes>
    )
}

export default NotesRouter