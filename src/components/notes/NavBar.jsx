import { FiMessageSquare, FiMail, FiCalendar, FiStar, FiCheckSquare, FiPower } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../reducers/slices/login'


const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const username = useSelector(state => state.login.user.name)

  const handleLogOut = (e) => {
    e.preventDefault()
    sessionStorage.clear()
    localStorage.clear()
    dispatch(logout())
  }

  return (
    <div className='w-full flex justify-between items-center h-[62px] bg-white rounded-md mt-4 p-7 shadow'>
      <div className='flex justify-center gap-[14px]' >
          <FiCheckSquare/>
          <FiMessageSquare />
          <FiMail />
          <FiCalendar />
          <FiStar color='#FF9F43' />
        </div>
      <div className='flex justify-center items-center gap-[20px]'>
          <h2 className='font-medium text-subtitle'>
              {
                  username
              }
          </h2>
          <button onClick={handleLogOut} >
              <FiPower />
          </button>
      </div>
    </div>
  )
}

export default NavBar
