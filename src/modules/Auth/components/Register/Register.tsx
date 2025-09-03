import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaCamera, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import loading from "../../../../assets/Images/loading.gif";
import { REQUIRED_VALIDATION } from "./../../../../util/validations";
import type { RegisterTypes } from "../../../../types/types";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterTypes>();
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );

  const onSubmit = async (data: RegisterTypes) => {
    try {
      const response = await axiosInstance.post(USERS_URLS.REGISTER, data);
      toast.success(response.data.message);
      navigate("/verify-account", { state: { email: data.email } });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" rounded-2xl  flex flex-col auth-form"
    >
      <h2 className="text-3xl font-bold text-[#FFA726] mb-2 self-start form-title">
        Create New Account
      </h2>
      <div className="flex justify-center w-full mb-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src={avatarPreview}
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-full hover:bg-black/20"
            >
              {!avatarPreview && (
                <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center">
                  <FaCamera className="text-white text-2xl" />
                </div>
              )}
              {avatarPreview && (
                <div className="absolute inset-0 bg-black/0 rounded-full flex items-center justify-center hover:bg-black/20 transition-all">
                  <FaCamera className="text-white text-2xl opacity-0 hover:opacity-100 transition-all" />
                </div>
              )}
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    setAvatarPreview(ev.target?.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 w-full px-10">
        <div>
          <label className="text-[#FFA726] text-sm">User Name</label>
          <input
            {...register("userName", {
              required: "Name is required",
              pattern: {
                value: /^[A-Za-z]+[0-9]+$/,
                message:
                  "Username must contain only letters followed by numbers without spaces",
              },
            })}
            type="text"
            placeholder="Enter your name"
            className="w-full bg-transparent border-b border-gray-300 text-white py-2 focus:outline-none"
          />
          {errors.userName && (
            <span className="text-red-700 text-xs">
              {errors?.userName.message?.toString()}
            </span>
          )}
        </div>
        <div>
          <label className="text-[#FFA726] text-sm">E-mail</label>
          <input
            {...register("email", REQUIRED_VALIDATION("Email"))}
            type="email"
            placeholder="Enter your E-mail"
            className="w-full bg-transparent border-b border-gray-300 text-white py-2 focus:outline-none"
          />
          {errors.email && (
            <span className="text-red-700 text-xs">
              {errors?.email.message?.toString()}
            </span>
          )}
        </div>
        <div>
          <label className="text-[#FFA726] text-sm">Country</label>
          <input
            {...register("country", { required: "Country is required" })}
            type="text"
            placeholder="Enter your country"
            className="w-full bg-transparent border-b border-gray-300 text-white py-2 focus:outline-none"
          />
          {errors.country && (
            <span className="text-red-700 text-xs">
              {errors.country.message?.toString()}
            </span>
          )}
        </div>
        <div>
          <label className="text-[#FFA726] text-sm">Phone Number</label>
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            type="text"
            placeholder="Enter your phone number"
            className="w-full bg-transparent border-b border-gray-300 text-white py-2 focus:outline-none"
          />
          {errors.phoneNumber && (
            <span className="text-red-700 text-xs">
              {errors?.phoneNumber.message?.toString()}
            </span>
          )}
        </div>
        <div>
          <label className="text-[#FFA726] text-sm">Password</label>
          <div className="flex items-center border-b border-gray-300">
            <input
              {...register("password", { required: "Password is required" })}
              type={showPass ? "text" : "password"}
              placeholder="Enter your Password"
              className="w-full bg-transparent text-white py-2 focus:outline-none border-0"
            />
            <button type="button" onClick={() => setShowPass(!showPass)}>
              {showPass ? (
                <FaRegEye className="text-[#FFA726]" />
              ) : (
                <FaRegEyeSlash className="text-[#FFA726]" />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-700 text-xs">
              {errors.password.message?.toString()}
            </span>
          )}
        </div>
        <div>
          <label className="text-[#FFA726] text-sm">Confirm Password</label>
          <div className="flex items-center border-b border-gray-300">
            <input
              {...register("confirmPassword", {
                required: "Confirm password is required",
              })}
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm New Password"
              className="w-full bg-transparent text-white py-2 focus:outline-none border-0"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? (
                <FaRegEye className="text-[#FFA726]" />
              ) : (
                <FaRegEyeSlash className="text-[#FFA726]" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <span className="text-red-700 text-xs">
              {errors.confirmPassword?.message?.toString()}
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mt-6">
        <button disabled={isSubmitting} className="form-btn text-center">
          Save
          <img
            hidden={!isSubmitting}
            className="w-[4%] inline"
            src={loading}
            alt="loading"
          />
        </button>
      </div>
    </form>
  );
};

export default Register;
