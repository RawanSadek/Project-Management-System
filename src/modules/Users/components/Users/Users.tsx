import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { RiCloseLargeLine, RiExpandUpDownLine } from "react-icons/ri";
import { axiosInstance, USERS_URLS } from "../../../../util/axios";
import dataLoading from "../../../../assets/Images/dataLoading.gif";
import type { UserTypes } from "../../../../types/types";
import { HiDotsVertical } from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import { ImEye } from "react-icons/im";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import noData from "../../../../assets/Images/no-data.jpg";
import { IoFilterSharp } from "react-icons/io5";
import { CgUnblock } from "react-icons/cg";
import Modal from "react-modal";
import noPP from "../../../../assets/Images/noPP.png";

export default function Users() {
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [rowIdx, setRowIdx] = useState<number>();
  const [filterOptionsOpen, setFilterOptionsOpen] = useState(false);
  const [filtersList, setFiltersList] = useState<string[]>([]);
  const [userDetails, setUserDetails] = useState<UserTypes | null>(null);

  const toggleInFiltersList = (value: string) => {
    setFiltersList((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value]
    );
    setFilterOptionsOpen(false);
  };

  const getUsers = async (
    userName: string,
    email: string,
    country: string,
    groups: string,
    pageNumber: number
  ) => {
    try {
      setLoading(true);
      const response = await axiosInstance(USERS_URLS.GETUSERS, {
        params: {
          userName: userName,
          email: email,
          country: country,
          groups: groups,
          pageSize: 5,
          pageNumber: pageNumber,
        },
      });
      setUsers(response.data.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  // serach
  const [userNameSearchValue, setUserNameSearchValue] = useState("");
  const [emailSearchValue, setEmailSearchValue] = useState("");
  const [countrySearchValue, setCountrySearchValue] = useState("");
  const [groupSearchValue, setGroupSearchValue] = useState("");

  const getUserNameSearchValue = (
    input: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserNameSearchValue(input?.target.value);
    getUsers(
      input.target.value,
      emailSearchValue,
      countrySearchValue,
      groupSearchValue,
      1
    );
    // setActivePage(1);
  };

  const getEmailSearchValue = (input: React.ChangeEvent<HTMLInputElement>) => {
    setEmailSearchValue(input.target.value);
    getUsers(
      userNameSearchValue,
      input.target.value,
      countrySearchValue,
      groupSearchValue,
      1
    );
    // setActivePage(1);
  };

  const getCountrySearchValue = (
    input: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCountrySearchValue(input.target.value);
    getUsers(
      userNameSearchValue,
      emailSearchValue,
      input.target.value,
      groupSearchValue,
      1
    );
    // setActivePage(1);
  };

  const getGroupSearchValue = (
    selection: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGroupSearchValue(selection.target.value);
    getUsers(
      userNameSearchValue,
      emailSearchValue,
      countrySearchValue,
      selection.target.value,
      1
    );
    // setActivePage(1);
  };

  const toggleUserStatus = async (id: number) => {
    try {
      setLoading(true);
      await axiosInstance.put(USERS_URLS.TOGGLE_USER(id));
      getUsers(
        userNameSearchValue,
        emailSearchValue,
        countrySearchValue,
        groupSearchValue,
        1
      );
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const getUserDetails = async (id: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(USERS_URLS.GET_USER_DETAILS(id));
      setUserDetails(response.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getUsers(
      userNameSearchValue,
      emailSearchValue,
      countrySearchValue,
      groupSearchValue,
      1
    );
  }, []);

  // User Details Modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "20px",
    },
  };

  function openModal(id: number) {
    setModalIsOpen(true);
    getUserDetails(id);
  }


  return (
    <>
      {/* Title */}
      <div className="bg-white !py-5 !px-8 text-3xl">
        <h2>Users</h2>
      </div>

      <div className="bg-white !my-5 !mx-8 text-3xl rounded-lg shadow-lg overflow-hidden">
        {/* Search Container */}
        <div className="!p-4 flex gap-2">
          <div
            hidden={!filtersList.includes("username")}
            className="flex justify-start items-center gap-2 border border-gray-400 lg:w-[20%] rounded-full !px-3 !py-1"
          >
            <GoSearch className="text-lg text-gray-700" />
            <input
              onChange={(e) => getUserNameSearchValue(e)}
              id="username"
              type="text"
              name="username"
              placeholder="Search by Username"
              className="min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>

          <div
            hidden={!filtersList.includes("email")}
            className="flex justify-start items-center gap-2 border border-gray-400 lg:w-[20%] rounded-full !px-3 !py-1"
          >
            <GoSearch className="text-lg text-gray-700" />
            <input
              onChange={(e) => getEmailSearchValue(e)}
              id="email"
              type="text"
              name="email"
              placeholder="Search by Email"
              className="min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>

          <div
            hidden={!filtersList.includes("country")}
            className="flex justify-start items-center gap-2 border border-gray-400 lg:w-[20%] rounded-full !px-3 !py-1"
          >
            <GoSearch className="text-lg text-gray-700" />
            <input
              onChange={(e) => getCountrySearchValue(e)}
              id="country"
              type="text"
              name="country"
              placeholder="Search by Country"
              className="min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>

          <div
            hidden={!filtersList.includes("group")}
            className="flex justify-start items-center gap-2 border border-gray-400 lg:w-[20%] rounded-full !px-3 !py-1"
          >
            <GoSearch className="text-lg text-gray-700" />
            <select
              onChange={(e) => getGroupSearchValue(e)}
              defaultValue=""
              name="group"
              id="group"
              className="text-sm w-[80%] focus:outline-0"
            >
              <option value="" disabled hidden>
                Search by Group
              </option>
              <option value="1">Manager</option>
              <option value="2">Employee</option>
            </select>
          </div>

          <div className="relative">
            <button
              onClick={() => setFilterOptionsOpen(!filterOptionsOpen)}
              className="flex !ms-3 cursor-pointer hover:bg-gray-100 justify-start items-center gap-2 border border-gray-400  rounded-full !px-3 !py-1"
            >
              <IoFilterSharp className="text-lg text-gray-700" />
              <p className="text-sm">Filter</p>
              {/* Dropdown */}
            </button>

            {filterOptionsOpen && (
              <div className="absolute flex flex-col gap-2 top-[90%] right-[10%] w-50 bg-white border border-gray-100 shadow-xl rounded-lg  z-50 !py-3 text-[16px]">
                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-md !p-2">
                  <input
                    type="checkbox"
                    checked={filtersList.includes("username")}
                    onChange={() => toggleInFiltersList("username")}
                    className="accent-[#466a63] w-4 h-4 cursor-pointer"
                  />
                  Filter by Username
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 !p-2 rounded-md">
                  <input
                    type="checkbox"
                    checked={filtersList.includes("email")}
                    onChange={() => toggleInFiltersList("email")}
                    className="accent-[#466a63] w-4 h-4 cursor-pointer"
                  />
                  Filter by Email
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 !p-2 rounded-md">
                  <input
                    type="checkbox"
                    checked={filtersList.includes("country")}
                    onChange={() => toggleInFiltersList("country")}
                    className="accent-[#466a63] w-4 h-4 cursor-pointer"
                  />
                  Filter by Country
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 !p-2 rounded-md">
                  <input
                    type="checkbox"
                    checked={filtersList.includes("group")}
                    onChange={() => toggleInFiltersList("group")}
                    className="accent-[#466a63] w-4 h-4 cursor-pointer"
                  />
                  Filter by Group
                </label>
              </div>
            )}
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
                  Country <RiExpandUpDownLine className="!ms-2 text-lg" />
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
            {/* Loading */}
            {loading && (
              <td colSpan={7} className="!py-10">
                <img
                  src={dataLoading}
                  alt="loading"
                  className="w-20 h-20 !mt-3 !mx-auto"
                />
              </td>
            )}

            {/* No Data */}
            {!loading && users.length == 0 && (
              <td colSpan={7} className="!py-10 text-center">
                <img
                  src={noData}
                  className="!mx-auto w-[40%]"
                  alt="no data"
                ></img>
                <h3 className="font-bold">No Data Found!</h3>
              </td>
            )}

            {/* Data Listing */}
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
                    <td className="!p-4">{user?.country}</td>
                    <td className="!p-4">
                      {new Date(user?.creationDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="!p-4 relative">
                      <HiDotsVertical
                        onClick={() => {
                          setActionsOpen(!actionsOpen);
                          setRowIdx(user?.id);
                        }}
                        className="text-xl cursor-pointer"
                      />
                      {actionsOpen && rowIdx == user?.id && (
                        <div className="absolute right-12 top-[70%] w-48 origin-top-right bg-white !py-3 shadow-lg border-1 border-gray-100 ring-opacity-5 z-10 rounded-2xl">
                          {user?.isActivated == true ? (
                            <div
                              onClick={() => {
                                toggleUserStatus(user.id);
                                setActionsOpen(false);
                              }}
                              className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer"
                            >
                              <MdBlock className="text-lg text-[#0E382F]" />
                              Block
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                toggleUserStatus(user.id);
                                setActionsOpen(false);
                              }}
                              className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer"
                            >
                              <CgUnblock className="text-lg text-[#0E382F]" />
                              Unblock
                            </div>
                          )}

                          <div
                            onClick={() => openModal(user.id)}
                            className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer"
                          >
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

      {/* View Users Details */}
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          onClick={() => setModalIsOpen(false)}
          className="text-[#ef9b28] hover:text-[#ffa930cb] block !ms-auto border-2 !p-1 rounded-lg cursor-pointer"
        >
          <RiCloseLargeLine className="text-xl" />
        </button>

        <div className="flex items-center gap-3">
          <div className=" text-center">
            <img
              src={noPP}
              alt="no pp"
              className="rounded-full w-[90%] !mx-auto !mb-5"
            />

            {userDetails?.isActivated == true ? (
              <div className="rounded-2xl bg-[#009247] w-fit !py-0.5 !px-3 text-white font-light !mx-auto">
                Active
              </div>
            ) : (
              <div className="rounded-2xl bg-[#922E25B2] w-fit !py-0.5 !px-3 text-white font-light !mx-auto">
                Not Active
              </div>
            )}
          </div>

          <div className="flex-1 !px-6">
            <div className="border-b border-gray-500 !pb-6">
              <h2 className="text-2xl font-semibold capitalize ">
                {userDetails?.userName}
              </h2>
              <small className="text-gray-400">
                Title: {userDetails?.group.name}
              </small>
            </div>

            <div className="!mt-6">
              <p className="!mb-4">
                <span className="font-semibold">Email:</span>{" "}
                {userDetails?.email}
              </p>
              <p className="!mb-4">
                <span className="font-semibold">Cuntry:</span>{" "}
                {userDetails?.country}
              </p>
              <p className="!mb-4">
                <span className="font-semibold">Phone Number:</span>{" "}
                {userDetails?.phoneNumber}
              </p>
              <p className="!mb-4">
                <span className="font-semibold">Joining Date:</span>{" "}
                {new Date(userDetails?.creationDate || "").toLocaleDateString(
                  "en-GB"
                )}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
