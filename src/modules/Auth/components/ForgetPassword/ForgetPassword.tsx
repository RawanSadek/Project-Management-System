// import loading from '../../../../assets/Images/loading.gif';

import { useForm } from "react-hook-form";
import type { forgetPassDataTypes } from "../../../../types/types";
import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import { toast } from "react-toastify";
import { REQUIRED_VALIDATION } from "../../../../util/validations";
import loading from '../../../../assets/Images/loading.gif';



const ForgetPassword = () => {
  let { getLoginData } = useContext(AuthContext);
  
  let navigate = useNavigate();
   let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<forgetPassDataTypes>();


    let onSubmit = async (data: forgetPassDataTypes) => {
       try {
         let response = await axiosInstance.post(USERS_URLS.FORGET_PASSWORD, data);
         console.log(response)
         localStorage.setItem('token', response.data.token);
         getLoginData();
           toast.success( response.data.message || "Check Your E-mail!")

         navigate('/reset-password' , {state:data.email});
   
      } catch (error: any) {
  toast.error(error?.response?.data?.message || "Please insert correct data");
}
     }
  return <>

      <h2 className="form-title">Forget Password</h2>
       

    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
              <label className="input-label">E-mail</label>
      <input {...register('email', REQUIRED_VALIDATION('Email'))} type="text" placeholder="Enter you E-mail" />
        {errors.email && <span className='text-red-700'>{errors.email.message as string}</span>}

                <div className="text-center">
          <button disabled={isSubmitting} className="form-btn text-center">Verify <img hidden={!isSubmitting} className="w-[4%] inline" src={loading} alt="loading" /></button>
        </div>
      </form>




  </>;
};

export default ForgetPassword;
