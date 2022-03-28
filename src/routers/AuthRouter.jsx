import { Route, Routes } from "react-router-dom"
import AuthScreen from "../components/auth/AuthScreen"
import LoginScreen from "../components/auth/login/LoginScreen"
import RecoveryScreen from "../components/auth/recovery/recoveryScreen"
import ResetPasswordScreen from "../components/auth/reset/ResetPasswordScreen"

const AuthRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthScreen />} >
          <Route index element={<LoginScreen />} />
          <Route path='recovery' element={<RecoveryScreen />} />
          <Route path='reset_password' element={<ResetPasswordScreen />} />
        </Route>
      </Routes>
    </div> 
  )
}

export default AuthRouter