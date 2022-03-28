import { Outlet } from "react-router-dom"

const AuthScreen = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center" >
        <Outlet />
    </div>
  )
}

export default AuthScreen