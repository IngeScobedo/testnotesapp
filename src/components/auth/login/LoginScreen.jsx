import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetIsChangingPassword } from '../../../reducers/slices/login'
import SuccessfullAlert from '../SuccessfullAlert'
import LoginForm from './LoginForm'

const LoginScreen = () => {
  const dispatch = useDispatch()
  const { isChangeSuccess } = useSelector((state) => state.login)
  useEffect(() => {
    setTimeout(() => {
      dispatch(resetIsChangingPassword())
    }
    , 2500)
  }, [])

  return (
    <>
    <div>
      {
        isChangeSuccess && <SuccessfullAlert />
      }
    </div>
    <div className="w-1/3 max-w-[407px] flex flex-col bg-white p-[30px] rounded-md">
      <h3 className="text-title font-medium text-primary-font-color mb-2">
        ¡Bienvenido de nuevo!
      </h3>
      <p className="text-subtitle font-normal leading-5 text-gray">
        Ingresa con tu usuario y contraseña para acceder a la plataforma.
      </p>
      
      <LoginForm />

    </div>
    </>
  )
}

export default LoginScreen