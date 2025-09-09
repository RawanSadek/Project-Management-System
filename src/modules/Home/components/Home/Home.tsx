import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { TbChecklist } from "react-icons/tb";
import { GoProjectSymlink } from "react-icons/go";
import ManagerDashboard from "../ManagerDashboard/ManagerDashboard";
import EmployeeDashboard from "../EmployeeDashboard/EmployeeDashboard";
import {
  axiosInstance,
  PROJECTS_URLS,
  TASKS_URLS,
} from "../../../../util/axios";
import dataLoading from "../../../../assets/Images/dataLoading.gif";
import type { AxiosError } from "axios";
import { toast } from "react-toastify";
import type { TasksCount } from "../../../../types/types";

export default function Home() {
  const { loginData } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [tasksCount, setTasksCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState<TasksCount | null>(null);

  const getTasksCount = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance(TASKS_URLS.GET_TASKS_COUNT);
      setTasks(response.data) // saving the tasks (TODO, in progress and done) to send them as props to the employee dashboard
      const count =
        response.data.toDo + response.data.inProgress + response.data.done;
      setTasksCount(count);
      setDoneCount(response.data.done);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  const getProjects = async () => {
    try {
      setLoading(true);
      let response;
      if (loginData?.userGroup == "Manager") {
        response = await axiosInstance(PROJECTS_URLS.GET_ALL_PROJECTS, {
          params: { pageSize: 99999 },
        });
      } else {
        response = await axiosInstance(PROJECTS_URLS.GET_EMPLOYEE_PROJECTS, {
          params: { pageSize: 99999 },
        });
      }
      setProjects(response?.data.data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  useEffect(() => {
    getTasksCount();
    getProjects();
  }, []);

  return (
    <>
      <div className="!p-4 lg:!p-10 h-full">
        {/* Header */}
        <div className="header h-[25%] lg:h-[45%] rounded-2xl">
          <div className="header-overlay !px-5 flex flex-col justify-center rounded-2xl">
            <h2 className="text-2xl lg:text-4xl text-white !mb-6">
              Welcome{" "}
              <span className="text-[#EF9B28]">{loginData?.userName}</span>
            </h2>
            {loginData?.userGroup == "Manager" ? (
              <p className="text-white text-lg lg:text-3xl font-light">
                You can add project and assign tasks to your team
              </p>
            ) : (
              <p className="text-white text-lg lg:text-3xl font-light">
                You can track your assigned tasks and project progress
              </p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="!my-5 flex flex-col justify-between items-center gap-5 lg:flex-row lg:gap-8">
          <div className="bg-white w-full lg:w-1/2 !py-5 rounded-xl shadow-s">
            <div className="!px-5 border-l-4 border-[#EF9B28]">
              <h4 className="font-semibold">Tasks</h4>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consecteture
              </p>
            </div>

            <div className="flex justify-between gap-5 !p-5 !mt-5">
              {/* Progress */}

              <div className="rounded-xl flex flex-col items-start gap-2 bg-[#E5E6F4] w-1/3 !p-4">
                <div className="bg-[#CFD1EC] rounded-xl !p-2 text-lg">
                  <LuChartNoAxesCombined />
                </div>
                <div className="!p-2">
                  <p className="text-gray-500 text-xs font-medium">Progress</p>
                  {loading ? (
                    <img
                      src={dataLoading}
                      alt="loading"
                      className="w-5 h-5 !mt-3"
                    />
                  ) : (
                    <>
                      {tasksCount == 0 ? (
                        <p className="text-2xl">0%</p>
                      ) : (
                        <p className="text-2xl">{`${(
                          (doneCount / tasksCount) *
                          100
                        ).toFixed(2)}%`}</p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Tasks */}
              <div className="rounded-xl flex flex-col items-start gap-2 bg-[#F4F4E5] w-1/3 !p-4">
                <div className="bg-[#E4E4BC] rounded-xl !p-2 text-lg">
                  <TbChecklist />
                </div>
                <div className="!p-2">
                  <p className="text-gray-500 text-xs font-medium">
                    Tasks Number
                  </p>
                  {loading ? (
                    <img
                      src={dataLoading}
                      alt="loading"
                      className="w-5 h-5 !mt-3"
                    />
                  ) : (
                    <p className="text-2xl">{tasksCount}</p>
                  )}
                </div>
              </div>

              {/* Projects */}
              <div className="rounded-xl flex flex-col items-start gap-2 bg-[#F4E5ED] w-1/3 !p-4">
                <div className="bg-[#E7C3D7] rounded-xl !p-2 text-lg">
                  <GoProjectSymlink />
                </div>
                <div className="!p-2">
                  <p className="text-gray-500 text-xs font-medium">
                    Projects Number
                  </p>
                  {loading ? (
                    <img
                      src={dataLoading}
                      alt="loading"
                      className="w-5 h-5 !mt-3"
                    />
                  ) : (
                    <p className="text-2xl">{projects?.length}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 !py-5 rounded-xl shadow-s">
            {loginData?.userGroup == "Manager" && <ManagerDashboard />}
            {loginData?.userGroup == "Employee" && <EmployeeDashboard tasks={tasks} />}
          </div>
        </div>
      </div>
    </>
  );
}
