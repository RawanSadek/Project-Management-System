import { useEffect, useState } from "react";
import { RiExpandUpDownLine } from "react-icons/ri";
import dataLoading from "../../../../assets/Images/dataLoading.gif";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { ImEye } from "react-icons/im";
import { axiosInstance, TASKS_URLS } from "../../../../util/axios";
import type { TasksTypesForManager } from "../../../../types/types";
import { GoSearch } from "react-icons/go";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../../shared/components/DeleteConfirmation/DeleteConfirmation";
import noData from "../../../../assets/Images/no-data.jpg";
import { Link } from "react-router-dom";
import type { AxiosError } from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
const statusColors: Record<string, string> = {
  ToDo: "bg-purple-100 text-purple-700",
  InProgress: "bg-orange-200 text-orange-700",
  Done: "bg-green-600 text-white",
};

const Table = () => {
  const [tasks, setTasks] = useState<TasksTypesForManager[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionsOpen, setActionsOpen] = useState(false);
  const [rowIdx, setRowIdx] = useState<number>();
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(1);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(1);
  const totalPages = totalResults;
  const pageSizes = [5, 10, 20, 50];
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);
  const [targetName, setTargetName] = useState<string>("");

  const openDeleteProject = (id: number, name: string) => {
    setTargetId(id);
    setTargetName(name);
    setIsDeleteOpen(true);
  };

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        TASKS_URLS.GET_PROJECT_TASKS_MANAGER(pageSize, page)
      );
      setTasks(response.data.data);
      setTotalResults(response.data.totalNumberOfPages);
      setTotalNumberOfRecords(response.data.totalNumberOfRecords);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message);
    }
    setLoading(false);
  };
  const deleteTasks = async () => {
    if (targetId == null) return;
    try {
      setLoading(true);
      const response = await axiosInstance.delete(
        TASKS_URLS.DELETE_TASKS(targetId)
      );
      toast.success(response.data.message || "Task deleted successfully");
      setTasks((prev) => prev.filter((p) => p.id !== targetId));
      getTasks();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message);
    } finally {
      setIsDeleteOpen(false);
      setTargetId(null);
      setTargetName("");
    }
    setLoading(false);
  };

  const TableHead = ["Title", "Status", "User", "Project", "Creation Date", ""];

  useEffect(() => {
    getTasks();
  }, [pageSize, page]);
  return (
    <div className="!p-4 bg-[#F7F7F7] min-h-screen">
      <div className="bg-white shadow !py-4 rounded-lg">
        <div className="!px-4 !py-1">
          <div className="flex justify-start items-center gap-2 border border-gray-400 lg:w-[20%] rounded-full !px-3 !py-1 !mb-4">
            <GoSearch className="text-lg text-gray-700" />
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Search Fleets"
              className="min-w-0 grow   text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
        <div className="overflow-x-auto !px-5 lg:!px-0">
          <table className="w-full">
            <thead className="bg-[#315951E5]">
              <tr className="text-sm text-white">
                {TableHead.map((head, index) => (
                  <th
                    key={index}
                    className="font-light !p-4 border-e border-black"
                  >
                    <div className="flex items-center">
                      {head} <RiExpandUpDownLine className="!ms-2 text-lg" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6} className="!py-10">
                    <img
                      src={dataLoading}
                      alt="loading"
                      className="w-20 h-20 !mt-3 !mx-auto"
                    />
                  </td>
                </tr>
              )}
              {!loading && (
                <>
                  {tasks?.map((task: TasksTypesForManager) => (
                    <tr
                      key={task?.id}
                      className="odd:bg-white even:bg-[#F5F5F5] text-sm hover:bg-gray-200"
                    >
                      <td data-label="Title:" className="!p-4 table-data">
                        {task?.title}
                      </td>
                      <td data-label="Status:" className={`!p-4 table-data  `}>
                        <span
                          className={` rounded-full text-xs font-semibold !px-3   ${
                            statusColors[task?.status]
                          }`}
                        >
                          {task?.status}
                        </span>
                      </td>
                      <td data-label="Employee:" className="!p-4 table-data">
                        {task?.employee?.userName}
                      </td>
                      <td data-label="Project:" className="!p-4 table-data">
                        {task?.project?.title}
                      </td>
                      <td
                        data-label="Creation Date:"
                        className="!p-4 table-data"
                      >
                        {new Date(task?.creationDate).toLocaleDateString(
                          "en-GB"
                        )}
                      </td>
                      <td className="!p-4 table-data relative">
                        <HiDotsVertical
                          onClick={() => {
                            setActionsOpen(!actionsOpen);
                            setRowIdx(task?.id);
                          }}
                          className="text-xl cursor-pointer"
                        />
                        {actionsOpen && rowIdx == task.id && (
                          <div className="absolute right-12 top-[70%] w-48 origin-top-right bg-white !py-3 shadow-lg border-1 border-gray-100 ring-opacity-5 z-50 rounded-2xl">
                            <Link
                              to={`/dashboard/tasks-data/${task.id}?mode=view`}
                            >
                              <div className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                                <ImEye className="text-lg text-[#0E382F]" />
                                View
                              </div>
                            </Link>
                            <Link
                              to={`/dashboard/tasks-data/${task.id}?mode=edit`}
                            >
                              <div className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                                <MdEdit className="text-lg text-[#0E382F]" />
                                Edit
                              </div>
                            </Link>

                            <div className="w-full flex items-center gap-2 !px-4 !py-2 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                              <MdDelete className="text-lg text-[#0E382F]" />
                              <span
                                onClick={() =>
                                  openDeleteProject(task.id, task.title)
                                }
                              >
                                Delete
                              </span>
                            </div>
                            <DeleteConfirmation
                              isOpen={isDeleteOpen}
                              onClose={() => setIsDeleteOpen(false)}
                              onDelete={deleteTasks}
                              entity="task"
                              name={targetName}
                            />
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              )}
              {!loading && tasks.length === 0 && (
                <tr>
                  <td colSpan={6} className="!py-10 ">
                    <img src={noData} alt="No Data" className="!mx-auto" />
                    <p className="text-center text-gray-500">No tasks found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/** Pagination Controls */}
        <div className="flex justify-end items-center border-t border-gray-200 !p-5 text-gray-600 text-[10px] md:text-sm">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <div className="relative">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
                className="appearance-none !px-4 !py-1 rounded-full border border-gray-300 focus:outline-none bg-white text-gray-700 font-semibold"
                style={{ minWidth: 60 }}
              >
                {pageSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <IoIosArrowDown className="text-[10px] md:text-sm" />
              </span>
            </div>
            <span>
              of{" "}
              <span className="font-semibold !mx-1">
                {totalNumberOfRecords}
              </span>{" "}
              Results
            </span>
          </div>
          <div className="flex items-center gap-4 !ms-6">
            <span>
              Page <span className="font-semibold !mx-1">{page}</span> of{" "}
              <span className="font-semibold !mx-1">{totalPages}</span>
            </span>
            <button
              className="rounded-full px-2 py-1 text-xl text-gray-400 hover:text-gray-700 disabled:opacity-50"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <TfiAngleLeft className="cursor-pointer text-[10px] md:text-sm" />
            </button>
            <button
              className="rounded-full px-2 py-1 text-xl text-gray-400 hover:text-gray-700 disabled:opacity-50"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <TfiAngleRight className="cursor-pointer text-[10px] md:text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
