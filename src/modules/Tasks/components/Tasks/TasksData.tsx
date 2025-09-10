import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  axiosInstance,
  PROJECTS_URLS,
  TASKS_URLS,
  USERS_URLS,
} from "../../../../util/axios";
import { toast } from "react-toastify";
import type {
  ProjectTypes,
  TaskEditForm,
  UserTypes,
} from "../../../../types/types";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import type { AxiosError } from "axios";
import { TfiAngleLeft } from "react-icons/tfi";
type Mode = "add" | "view" | "edit";
const TasksData = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const [searchParams] = useSearchParams();
  const mode: Mode =
    (searchParams.get("mode") as Mode) || (id ? "view" : "add");
  const heading = useMemo(() => {
    if (mode === "add") return "Add a New task";
    if (mode === "edit") return "Edit task";
    return "View task";
  }, [mode]);
  const isReadOnly = mode === "view";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      employeeId: 0,
      projectId: 0,
    },
  });
  const onSubmit = async (data: TaskEditForm) => {
    try {
      if (mode === "edit" && id) {
        const numericId = Number(id);
        const response = await axiosInstance.put(
          TASKS_URLS.EDIT_TASKS(numericId),
          data
        );
        toast.success(response.data.message || "Task updated successfully!");
        navigate("/dashboard/tasks");
      } else {
        const response = await axiosInstance.post(
          TASKS_URLS.CREATE_TASKS,
          data
        );
        toast.success(response.data.message || "Task created successfully!");
        navigate("/dashboard/tasks");
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  const [projects, setProjects] = useState<ProjectTypes[]>([]);
  const [users, setUsers] = useState<UserTypes[]>([]);
  const [loadingOne, setLoadingOne] = useState(false);

  const getUsers = async () => {
    try {
      const response = await axiosInstance.get(USERS_URLS.GETUSERS);
      setUsers(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getProjects = async () => {
    try {
      const response = await axiosInstance.get(PROJECTS_URLS.GET_ALL_PROJECTS);
      setProjects(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDetailsTask = async () => {
    if (!id) return;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return;
    }
    try {
      setLoadingOne(true);
      const response = await axiosInstance.get(
        TASKS_URLS.GET_TASKS_DETAILS(numericId)
      );
      const dto = response?.data?.data ?? response?.data;
      reset({
        title: dto?.title ?? "",
        description: dto?.description ?? "",
        employeeId: dto?.employee?.id ?? 0,
        projectId: dto?.project?.id ?? 0,
      });
    } catch (error) {
      toast.error("Failed to fetch task details.");
    } finally {
      setLoadingOne(false);
    }
  };

  useEffect(() => {
    if (id && (mode === "edit" || mode === "view")) getDetailsTask();
    getUsers();
    getProjects();
  }, [id, mode, reset]);
  return (
    <>
      <div className="bg-white !py-4 !px-3 ">
        <button className="inline-flex items-center gap-1.5 text-sm  text-gray-800">
          <TfiAngleLeft />
          <Link to={"/dashboard/tasks"}>View All Tasks</Link>
        </button>
        <div>
          <h2 className="bg-white !py-3 !px-3 text-2xl">{heading} </h2>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center !min-h-screen bg-[#F7F7F7]">
        <div className="!w-full !max-w-5xl bg-white rounded-2xl shadow-lg !p-8">
          <h2 className="text-2xl font-bold text-[#315951] !mb-6"></h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div>
              <label className="block text-gray-600 !mb-2">Title</label>
              <input
                readOnly={isReadOnly}
                {...register("title", { required: "Title is required" })}
                placeholder="Name"
                className="!w-full rounded-xl border border-gray-300 !px-4 !py-3 text-gray-700 focus:outline-none focus:border-[#315951] bg-[#F7F7F7]"
              />
              {errors.title && (
                <span className="text-red-500 text-xs">
                  {errors.title.message as string}
                </span>
              )}
            </div>
            <div>
              <label className="block text-gray-600 !mb-2">Description</label>
              <textarea
                readOnly={isReadOnly}
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Description"
                className="!w-full rounded-xl border border-gray-300 !px-4 !py-3 text-gray-700 focus:outline-none focus:border-[#315951] bg-[#F7F7F7] min-h-[120px]"
              />
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message as string}
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-gray-600 !mb-2">User</label>
                <div className="flex items-center">
                  <select
                    {...register("employeeId", {
                      required: "User is required",
                      valueAsNumber: true,
                    })}
                    className="!w-full rounded-xl border border-gray-300 !px-10 !py-3 text-gray-700 focus:outline-none focus:border-[#315951] bg-[#F7F7F7]"
                    defaultValue={watch("employeeId") || ""}
                    disabled={isReadOnly}
                  >
                    <option value="">No Users Selected</option>
                    {users.map((user) => (
                      <option key={user?.id} value={user?.id}>
                        {user?.userName}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.employeeId && (
                  <span className="text-red-500 text-xs">
                    {errors.employeeId.message as string}
                  </span>
                )}
              </div>
              <div className="relative">
                <label className="block text-gray-600 !mb-2">Project</label>
                <div className="flex items-center">
                  <select
                    {...register("projectId", {
                      required: "Project is required",
                      valueAsNumber: true,
                    })}
                    className="!w-full rounded-xl border border-gray-300 !px-10 !py-3 text-gray-700 focus:outline-none focus:border-[#315951] bg-[#F7F7F7]"
                    defaultValue={watch("projectId") || ""}
                    disabled={isReadOnly}
                  >
                    <option value="">No projects Selected</option>
                    {projects.map((project) => (
                      <option key={project?.id} value={project?.id}>
                        {project?.title}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.projectId && (
                  <span className="text-red-500 text-xs">
                    {errors.projectId.message as string}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center !mt-8">
              <button
                type="button"
                className="cursor-pointer  border border-[#315951] text-[#315951] rounded-full !px-8 !py-3 font-semibold hover:bg-[#F7F7F7]"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              {mode === "view" ? null : (
                <button
                  type="submit"
                  disabled={isSubmitting || loadingOne}
                  className="bg-[#FFA726] text-white font-bold !py-3 !px-8 rounded-full cursor-pointer hover:bg-[#FF8C00]"
                >
                  {isSubmitting
                    ? mode === "edit"
                      ? "Updating..."
                      : "Saving..."
                    : mode === "edit"
                    ? "Update"
                    : "Save"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TasksData;
