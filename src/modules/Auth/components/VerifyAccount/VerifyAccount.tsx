import { useForm } from "react-hook-form";
import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import { toast } from "react-toastify";
import type { VerifyAccountTypes } from "../../../../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import loading from "../../../../assets/Images/loading.gif";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmail = location.state?.email || "";
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<VerifyAccountTypes>({
    defaultValues: { email: passedEmail, code: "" },
  });

  const onSubmit = async (data: VerifyAccountTypes) => {
    try {
      const response = await axiosInstance.put(USERS_URLS.VERIFYACCOUNT, data);
      console.log(response);

      toast.success(`Account verified successfully!`);
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md rounded-2xl  mx-auto p-6 sm:p-10 relative flex flex-col gap-7 auth-form "
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FFA726] mb-6 sm:mb-8 self-start form-title ">
        Verify Account
      </h2>
      <div className="w-full mb-4 sm:mb-6">
        <label className="text-[#FFA726] text-sm">E-mail</label>
        <input
          {...register("email")}
          type="email"
          value={watch("email")}
          disabled
          className="w-full bg-transparent border-b border-gray-300 text-white py-2 focus:outline-none opacity-70 cursor-not-allowed"
        />
      </div>
      <div className="w-full mb-4 sm:mb-6">
        <label className="text-[#FFA726] text-sm">OTP Verification</label>
        <input
          {...register("code", { required: "OTP is required" })}
          type="text"
          placeholder="Enter Verification"
          className="w-full bg-transparent border-b border-gray-300 text-white py-2 focus:outline-none"
        />
        {errors.code && (
          <span className="text-red-500 text-xs">
            {typeof errors.code.message === "string" ? errors.code.message : ""}
          </span>
        )}
      </div>
      <div className="w-full flex justify-center mt-4 sm:mt-6">
        <button
          disabled={isSubmitting}
          className="form-btn text-center w-full sm:w-auto px-6 py-3 text-base sm:text-lg"
        >
          Save
          <img
            hidden={!isSubmitting}
            className="w-4 sm:w-[4%] inline ml-2"
            src={loading}
            alt="loading"
          />
        </button>
      </div>
    </form>
  );
};

export default VerifyAccount;
