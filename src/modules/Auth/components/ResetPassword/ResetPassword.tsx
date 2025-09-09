import { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import { toast } from "react-toastify";
import {
  CONFIRM_PASSWORD_VALIDATION,
  OTP_VALIDATION,
  PASSWORD_VALIDATION,
} from "../../../../util/validations";
import type { resetPassDataTypes } from "../../../../types/types";
import loading from "../../../../assets/Images/loading.gif";

const ResetPassword = () => {
  const { getLoginData } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();
  const defaultEmail = typeof state === "string" ? state : state?.email ?? "";
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<resetPassDataTypes>({
    defaultValues: { email: defaultEmail },
  });
  const passwordValue = watch("password");

  const onSubmit = async (data: resetPassDataTypes) => {
    try {
      const response = await axiosInstance.post(
        USERS_URLS.RESET_PASSWORD,
        data
      );

      toast.success(response.data.message || "Password Reset Successfully!");
      navigate("/login");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Please insert correct data"
      );
    }
  };

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    if (watch("confirmPassword")) {
      trigger("confirmPassword");
    }
  }, [passwordValue, trigger, watch]);

  return (
    <>
      <h2 className="form-title">Reset Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        {/* email */}
        <label className="input-label">E-mail</label>
        <input
          {...register("email")}
          readOnly
          type="text"
          placeholder="Enter you E-mail"
          aria-label="email"
          aria-describedby="basic-addon1"
        />
        {/* otp */}
        <label className="input-label !mt-3">OTP Verification</label>
        <input
          {...register("seed", OTP_VALIDATION)}
          type="text"
          placeholder="Enter you OTP Verification"
        />
        {errors.seed && (
          <span className="text-red-700">{errors.seed.message as string}</span>
        )}
        {/* password */}
        <label className="input-label !mt-6"> New Password</label>
        <div className="pass-input flex justify-between items-center border-b border-b-white">
          <input
            {...register("password", PASSWORD_VALIDATION)}
            className="!w-[90%] !border-b-0"
            type={showPass ? "text" : "password"}
            placeholder="Enter you New Password"
          />
          <div className="pss-toggle">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              onClick={() => setShowPass((prev) => !prev)}
              type="button"
              className="input-group-text py-2 border-0 rounded-start-0"
              id="basic-addon1"
            >
              {showPass ? (
                <FaRegEyeSlash className="cursor-pointer text-lg text-white" />
              ) : (
                <FaRegEye className="cursor-pointer text-lg text-white" />
              )}
            </button>
          </div>
        </div>
        {errors.password && (
          <span className="text-red-700">
            {errors.password.message as string}
          </span>
        )}

        {/* Confirm password */}
        <label className="input-label !mt-6"> Confirm Password</label>
        <div className="pass-input flex justify-between items-center border-b border-b-white">
          <input
            {...register(
              "confirmPassword",
              CONFIRM_PASSWORD_VALIDATION(passwordValue)
            )}
            className="!w-[90%] !border-b-0"
            type={showConfirmPass ? "text" : "password"}
            placeholder="Confirm New Password"
          />
          <div className="pss-toggle">
            <button
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
              onClick={() => setShowConfirmPass((prev) => !prev)}
              type="button"
              className="input-group-text py-2 border-0 rounded-start-0"
              id="basic-addon1"
            >
              {showConfirmPass ? (
                <FaRegEyeSlash className="cursor-pointer text-lg text-white" />
              ) : (
                <FaRegEye className="cursor-pointer text-lg text-white" />
              )}
            </button>
          </div>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-700">
            {errors.confirmPassword.message as string}
          </span>
        )}

        <div className="text-center">
          <button disabled={isSubmitting} className="form-btn text-center">
            Verify{" "}
            <img
              hidden={!isSubmitting}
              className="w-[4%] inline"
              src={loading}
              alt="loading"
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default ResetPassword;
