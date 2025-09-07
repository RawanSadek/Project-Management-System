import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiExpandUpDownLine } from "react-icons/ri";
import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import dataLoading from "../../../../assets/Images/dataLoading.gif";
import type { UserTypes } from "../../../../types/types";
import { HiDotsVertical } from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import { ImEye } from "react-icons/im";

export default function Users() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [rowIdx, setRowIdx] = useState<number>();

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance(USERS_URLS.GETUSERS);
      setUsers(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {/* Title */}
      <div className="bg-white !py-5 !px-8 text-3xl">
        <h2>Users</h2>
      </div>

      {/* Data */}
      <div className="bg-white !my-5 !mx-8 text-3xl rounded-lg">
        {/* Search Container */}
        <div className="!p-4">
          <div className="flex justify-start items-center gap-2 border border-gray-400 lg:w-[20%] rounded-full !px-3 !py-1">
            <GoSearch className="text-lg text-gray-700" />
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Search Fleets"
              className="min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>

        {/* Table */}
        <table className="w-full">
          <thead className="bg-[#315951E5]">
            <tr className="text-sm text-white">
              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  User Name <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  Statuses <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  Phone Number <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e  border-black">
                <div className="flex items-center">
                  Email <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  Creation Date <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4"></th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <td colSpan={6} className="!py-10">
                <img
                  src={dataLoading}
                  alt="loading"
                  className="w-20 h-20 !mt-3 !mx-auto"
                />
              </td>
            )}
            {!loading && (
              <>
                {users?.map((user: UserTypes) => (
                  <tr
                    key={user.id}
                    className="odd:bg-white even:bg-[#F5F5F5] text-sm"
                  >
                    <td className="!p-4">{user?.userName}</td>
                    <td className="!p-4 ">
                      {user?.isActivated == true ? (
                        <div className="rounded-2xl bg-[#009247] w-fit !py-0.5 !px-3 text-white font-light">
                          Active
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-[#922E25B2] w-fit !py-0.5 !px-3 text-white font-light">
                          Not Active
                        </div>
                      )}
                    </td>
                    <td className="!p-4">{user?.phoneNumber}</td>
                    <td className="!p-4">{user?.email}</td>
                    <td className="!p-4">{new Date(user?.creationDate).toLocaleDateString("en-GB")}</td>
                    <td className="!p-4 relative">
                      <HiDotsVertical
                        onClick={() => {
                          setActionsOpen(!actionsOpen);
                          setRowIdx(user?.id);
                        }}
                        className="text-xl cursor-pointer"
                      />
                      {actionsOpen && rowIdx == user?.id && (
                        <div className="absolute right-12 top-[70%] w-48 origin-top-right bg-white !py-3 shadow-lg border-1 border-gray-100 ring-opacity-5 z-50 rounded-2xl">
                          <div className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                            <MdBlock className="text-lg text-[#0E382F]" />
                            Block
                          </div>
                          <div className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                            <ImEye className="text-lg text-[#0E382F]" />
                            View
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
