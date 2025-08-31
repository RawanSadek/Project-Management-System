import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { changePassDataTypes } from "../../../../types/types";
import { useEffect, useState } from "react";
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION, REQUIRED_VALIDATION } from "../../../../util/validations";
import loading from '../../../../assets/Images/loading.gif';
import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ChangePassword() {

  let navigate = useNavigate();

  let { register, handleSubmit, formState: { errors, isSubmitting }, watch, trigger } = useForm<changePassDataTypes>();

  const newPassword = watch('newPassword');

  let onSubmit = async (data: changePassDataTypes) => {
    try {
      let response = await axiosInstance.put(USERS_URLS.CHANGEPASSWORD, data);
      toast.success(response.data.message);
      navigate('/login');

    } catch (error) {
      console.log(error)
    }
  }

  let [showOldPass, setShowOldPass] = useState(false);
  let [showNewPass, setShowNewPass] = useState(false);
  let [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (watch('confirmNewPassword'))
      trigger('confirmNewPassword');
  }, [watch('oldPassword')])

  return (
    <>
      <h2 className="form-title">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

        <label className="input-label !mt-6">Old Password</label>
        <div className="pass-input flex justify-between items-center border-b border-b-white">
          <input {...register('oldPassword', REQUIRED_VALIDATION('Old Password'))} className="!w-[90%] !border-b-0" type={showOldPass ? 'text' : 'password'} placeholder="Enter you Old Password" />
          <div className="pss-toggle">
            <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowOldPass(!showOldPass)} type='button' className="input-group-text py-2 border-0 rounded-start-0" id="basic-addon1">{showOldPass ? <FaRegEyeSlash className="cursor-pointer text-lg text-white" /> : <FaRegEye className="cursor-pointer text-lg text-white" />}</button>
          </div>
        </div>
        {errors.oldPassword && <span className='text-red-700'>{errors.oldPassword.message as string}</span>}

        <label className="input-label !mt-6">New Password</label>
        <div className="pass-input flex justify-between items-center border-b border-b-white">
          <input {...register('newPassword', PASSWORD_VALIDATION)} className="!w-[90%] !border-b-0" type={showNewPass ? 'text' : 'password'} placeholder="Enter you New Password" />
          <div className="pss-toggle">
            <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowNewPass(!showNewPass)} type='button' className="input-group-text py-2 border-0 rounded-start-0" id="basic-addon1">{showNewPass ? <FaRegEyeSlash className="cursor-pointer text-lg text-white" /> : <FaRegEye className="cursor-pointer text-lg text-white" />}</button>
          </div>
        </div>
        {errors.newPassword && <span className='text-red-700'>{errors.newPassword.message as string}</span>}

        <label className="input-label !mt-6">Confirm New Password</label>
        <div className="pass-input flex justify-between items-center border-b border-b-white">
          <input {...register('confirmNewPassword', CONFIRM_PASSWORD_VALIDATION(newPassword))} className="!w-[90%] !border-b-0" type={showConfirmPass ? 'text' : 'password'} placeholder="Confirm New Password" />
          <div className="pss-toggle">
            <button onMouseDown={(e) => e.preventDefault()} onMouseUp={(e) => e.preventDefault()} onClick={() => setShowConfirmPass(!showConfirmPass)} type='button' className="input-group-text py-2 border-0 rounded-start-0" id="basic-addon1">{showConfirmPass ? <FaRegEyeSlash className="cursor-pointer text-lg text-white" /> : <FaRegEye className="cursor-pointer text-lg text-white" />}</button>
          </div>
        </div>
        {errors.confirmNewPassword && <span className='text-red-700'>{errors.confirmNewPassword.message as string}</span>}

        <div className="text-center">
          <button disabled={isSubmitting} className="form-btn text-center">Save <img hidden={!isSubmitting} className="w-[4%] inline" src={loading} alt="loading" /></button>
        </div>

      </form >
    </>

  )
}
