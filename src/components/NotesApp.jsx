import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Route, Routes, useNavigate } from "react-router-dom"
import AuthRouter from "../routers/AuthRouter"
import NotesRouter from "../routers/NotesRouter"

const NotesApp = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector(state => state.login)

  useEffect(()=>{
    if (!isAuthenticated) {
      navigate("/auth", { replace: true });
    }
  }, [isAuthenticated])

  return (
    <div className="w-full h-screen bg-background-color">
      <Routes>
        <Route path="/auth/*" element={<AuthRouter />} />
        <Route path="/*" element={<NotesRouter />} />
      </Routes>  
    </div>
  )
}

export default NotesApp
