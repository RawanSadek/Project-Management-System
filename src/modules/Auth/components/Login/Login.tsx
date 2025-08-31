import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import type { loginDataTypes } from "../../../../types/types";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import { REQUIRED_VALIDATION } from "../../../../util/validations";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import loading from '../../../../assets/Images/loading.gif';
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";

export default function Login() {

  let {getLoginData} = useContext(AuthContext);

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<loginDataTypes>();

  let onSubmit = async (data: loginDataTypes) => {
    try {
      let response = await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Login', data);
      console.log(response)
      localStorage.setItem('token', response.data.token);
      getLoginData();
      toast.success(`Welcome to the Food App!`);
      navigate('/dashboard');

    } catch (error) {
      toast.error('Wrong Email or Password!')
      // console.log(error)
    }
  }

  let [showPass, setShowPass] = useState(false);

  return (
    <>
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <label className="input-label">E-mail</label>
        <input {...register('email', REQUIRED_VALIDATION('Email'))} type="text" placeholder="Enter you E-mail" />
        {errors.email && <span className='text-red-700'>{errors.email.message as string}</span>}

        <label className="input-label !mt-6">Password</label>
        <div className="pass-input flex justify-between items-center border-b border-b-white">
          <input {...register('password', REQUIRED_VALIDATION('Password'))} className="!w-[90%] !border-b-0" type={showPass?'text':'password'} placeholder="Enter you password" />
          <div className="pss-toggle">
            <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowPass(!showPass)} type='button' className="input-group-text py-2 border-0 rounded-start-0" id="basic-addon1">{showPass ? <FaRegEyeSlash className="cursor-pointer text-lg text-white"/> : <FaRegEye className="cursor-pointer text-lg text-white"/>}</button>
          </div>
          {/* <FaRegEye onClick={!showPass} className="cursor-pointer text-lg text-white"/> */}
        </div>

        {errors.password && <span className='text-red-700'>{errors.password.message as string}</span>}

        <div className="links flex justify-between !mt-4 text-white">
          <Link to='/register'>Register Now?</Link>
          <Link to='/forget-password'>Forgot Password?</Link>
        </div>


        <div className="text-center">
          <button disabled={isSubmitting} className="form-btn text-center">Login <img hidden={!isSubmitting} className="w-[4%] inline" src={loading} alt="loading" /></button>
        </div>
      </form>
    </>
  )
}
