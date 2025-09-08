import { useForm } from "react-hook-form";
import {
  axiosInstance,
  PROJECTS_URLS,
  TASKS_URLS,
  USERS_URLS,
} from "../../../../util/axios";
import { toast } from "react-toastify";
import type { TaskEditForm, TaskFormProps } from "../../../../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TasksData = ({ mode = "add", task, onSuccess }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      title: task?.title || "",
      description: task?.description || "",
      employeeId: task?.employeeId || 0,
      projectId: task?.projectId || 0,
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data: TaskEditForm) => {
    try {
      if (mode === "add") {
        await axiosInstance.post(TASKS_URLS.CREATE_TASKS, data);
      } else if (mode === "edit" && task?.id) {
        await axiosInstance.put(TASKS_URLS.EDIT_TASKS(task.id), data);
      }
      toast.success(
        mode === "add" ? "Task added successfully" : "Task updated successfully"
      );
      navigate("/dashboard/tasks");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    }
  };
  const [projects, setProjects] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

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
  useEffect(() => {
    getUsers();
    getProjects();
  }, []);
  return (
    <div className="flex flex-col items-center justify-center !min-h-screen bg-[#F7F7F7]">
      <div className="!w-full !max-w-5xl bg-white rounded-2xl shadow-lg !p-8">
        <h2 className="text-2xl font-bold text-[#315951] !mb-6">
          {mode === "add"
            ? "Add a New Task"
            : mode === "edit"
            ? "Edit Task"
            : "View Task"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <label className="block text-gray-600 !mb-2">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              disabled={mode === "view"}
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
              {...register("description", {
                required: "Description is required",
              })}
              disabled={mode === "view"}
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
                  disabled={mode === "view"}
                  className="!w-full rounded-xl border border-gray-300 !px-10 !py-3 text-gray-700 focus:outline-none focus:border-[#315951] bg-[#F7F7F7]"
                  defaultValue={watch("employeeId") || ""}
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
                  disabled={mode === "view"}
                  className="!w-full rounded-xl border border-gray-300 !px-10 !py-3 text-gray-700 focus:outline-none focus:border-[#315951] bg-[#F7F7F7]"
                  defaultValue={watch("projectId") || ""}
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
              className="border border-[#315951] text-[#315951] rounded-full !px-8 !py-3 font-semibold"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
            {mode !== "view" && (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FFA726] text-white font-bold !py-3 !px-8 rounded-full"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default TasksData;
