import { useContext, useState } from 'react'
import { AuthContext } from '../../../../Contexts/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { AiOutlineHome } from 'react-icons/ai';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { CiGrid42 } from 'react-icons/ci';
import { BsListCheck } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri';
import { TbLogout2, TbUsers } from 'react-icons/tb';

export default function SideBar() {

  let { loginData, logout } = useContext(AuthContext);

  let [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Sidebar collapsed={collapsed} className='h-full bg-[#0E382F] !py-4'>
        <button onClick={()=>setCollapsed(!collapsed)} className='!ms-auto block cursor-pointer'>{!collapsed?<TfiAngleLeft className='text-white !ms-auto !mb-5 bg-[#EF9B28] h-8 rounded-l-lg'/>:<TfiAngleRight className='text-white !ms-auto !mb-5 bg-[#EF9B28] h-8 rounded-l-lg'/>}</button>
        <Menu className='w-[85%] !mx-auto' >
          <MenuItem component={<Link to="/dashboard" />} className='text-white'> <AiOutlineHome className='text-2xl inline !me-4 !mb-2' />Home</MenuItem>
          <MenuItem component={<Link to="/dashboard/projects" />} className='text-white'> <CiGrid42 className='text-2xl inline !me-4 !mb-1' />Projects</MenuItem>
          <MenuItem component={<Link to="/dashboard/tasks" />} className='text-white'> <BsListCheck className='text-2xl inline !me-4 !mb-1' />Tasks</MenuItem>
          {loginData?.userGroup == 'Manager' && <MenuItem component={<Link to="/dashboard/users" />} className='text-white'> <TbUsers className='text-2xl inline !me-4 !mb-1' />Users</MenuItem>}
          <MenuItem component={<Link to="/change-password" />} className='text-white'> <RiLockPasswordLine className='text-2xl inline !me-4 !mb-1' />Change Password</MenuItem>
          <MenuItem component={<Link to="/login" />} onClick={logout} className='text-white'> <TbLogout2 className='text-2xl inline !me-4 !mb-1' />Logout</MenuItem>
        </Menu>
      </Sidebar>
    </>
  )
}
