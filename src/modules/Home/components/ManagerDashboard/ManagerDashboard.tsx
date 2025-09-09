import { useEffect, useState } from "react";
import { SlUserFollowing, SlUserUnfollow } from "react-icons/sl";
import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import dataLoading from "../../../../assets/Images/dataLoading.gif";
import type { UsersCountTypes } from "../../../../types/types";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export default function ManagerDashboard() {
  const [usersCount, setUsersCount] = useState<UsersCountTypes>();
  const [loading, setLoading] = useState(false);

  const getUsersCount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance(USERS_URLS.GET_USERS_COUNT);
      setUsersCount(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsersCount();
  }, []);

  return (
    <div className="bg-white w-full lg:w-1/2 !py-5 rounded-xl shadow-s">
      <div className="!px-5 border-l-4 border-[#EF9B28]">
        <h4 className="font-semibold">Tasks</h4>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet, consecteture
        </p>
      </div>

      <div className="flex justify-start gap-5 !p-5 !mt-5">
        {/* Active */}
        <div className="rounded-xl flex flex-col items-start gap-2 bg-[#E5E6F4] w-1/3 !p-4">
          <div className="bg-[#CFD1EC] rounded-xl !p-2 text-lg">
            <SlUserFollowing />
          </div>
          <div className="!p-2">
            <p className="text-gray-500 text-xs font-medium">Active</p>
            {loading ? (
              <img src={dataLoading} alt="loading" className="w-5 h-5 !mt-3" />
            ) : (
              <p className="text-2xl">{usersCount?.activatedEmployeeCount}</p>
            )}
          </div>
        </div>

        {/* Inactive */}
        <div className="rounded-xl flex flex-col items-start gap-2 bg-[#F4F4E5] w-1/3 !p-4">
          <div className="bg-[#E4E4BC] rounded-xl !p-2 text-xl">
            <SlUserUnfollow />
          </div>
          <div className="!p-2">
            <p className="text-gray-500 text-xs font-medium">Inactive</p>
            {loading ? (
              <img src={dataLoading} alt="loading" className="w-5 h-5 !mt-3" />
            ) : (
              <p className="text-2xl">{usersCount?.deactivatedEmployeeCount}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
