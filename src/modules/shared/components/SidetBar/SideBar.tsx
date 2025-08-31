import { useContext } from 'react'
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

export default function SideBar() {

  let { logout } = useContext(AuthContext);

  return (
    <>
      <Link to='/login'><button onClick={logout}> Logout </button></Link>
    </>
  )
}
