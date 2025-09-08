import { useForm } from "react-hook-form";
import { TfiAngleLeft } from "react-icons/tfi";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import type { FormDataProject } from "../../../types/types";
import { axiosInstance, PROJECTS_URLS } from "../../../util/axios";
import { toast } from "react-toastify";
import { REQUIRED_VALIDATION } from "../../../util/validations";
import loading from "../../../assets/Images/dataLoading.gif";
import { useEffect, useMemo, useState } from "react";

const ProjectsData = () => {
  type Mode = "add" | "view" | "edit";
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string  }>();
  const [searchParams] = useSearchParams();
  const mode: Mode = (searchParams.get("mode") as Mode) || (id ? "view" : "add");
  const [loadingOne, setLoadingOne] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, reset,   
  } = useForm<FormDataProject>();


    const heading = useMemo(() => {
    if (mode === "add") return "Add a New Project";
    if (mode === "edit") return "Edit Project";
    return "View Project";
  }, [mode]);
  const isReadOnly = mode === "view";
  {
    /* Add Project and edit  */
  }
  const onSubmit = async (data: FormDataProject) => {
    const payload = {
      title: (data.title ?? "").trim(),
      description: (data.description ?? "").trim(),
    };

    try {
      if (mode === "add") {
        const response = await axiosInstance.post(
          PROJECTS_URLS.CREATE_PROJECTS,
          payload
        );
        toast.success(response.data?.message || "Added Successfully");
      } else if (mode === "edit" && id) {
        const numericId = Number(id);
        if (Number.isNaN(numericId)) {
          toast.error("Invalid project id");
          return;
        }
        const response = await axiosInstance.put(
          PROJECTS_URLS.EDIT_PROJECTS_BY_MANGER(numericId),
          payload
        );
        toast.success(response.data?.message || "Updated Successfully");
      } else {
        // view mode: رجوع فقط
        navigate(-1);
        return;
      }
      navigate("/dashboard/projects");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Please insert correct data");
    }
  };
    const getDetailsProject = async () => {
    if (!id) return;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      toast.error("Invalid project id");
      return;
    }
    try {
      setLoadingOne(true);
      const response = await axiosInstance.get(
        PROJECTS_URLS.GET_PROJECT_DETAILS(numericId)
      );
      const dto = response?.data?.data ?? response?.data;
      reset({
        id: dto?.id ?? numericId,
        title: dto?.title ?? "",
        description: dto?.description ?? "",
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to load project");
    } finally {
      setLoadingOne(false);
    }
  };
  useEffect(() => {
  if (id) getDetailsProject();
}, [id]);
    
  return (
    <>
 

      <div className="bg-white !py-4 !px-3 ">
        <button className="inline-flex items-center gap-1.5 text-sm  text-gray-800">
          <TfiAngleLeft />
          <Link to={"/dashboard/projects"}>View All Projects</Link>
        </button>
        <div>
          <h2 className="bg-white !py-3 !px-3 text-2xl">{heading} </h2>
        </div>
      </div>

      {/* form  */}

      <div className="!max-w-2xl !mx-auto !p-4 !my-3">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200">
          <form onSubmit={handleSubmit(onSubmit)} className="!p-6 sm:!p-8">
            {/* Title */}
            <label className="block text-sm font-medium text-slate-500 !mb-2">
              Title
            </label>
            <input
              {...register("title", REQUIRED_VALIDATION("title"))}
              type="text"
              placeholder="Name"
              className="w-full rounded-2xl border border-slate-200 bg-white/80 !px-4 !py-3 text-slate-700 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
                         readOnly={isReadOnly}
            />
            {errors.title && (
              <span className="text-red-700">
                {errors.title.message as string}
              </span>
            )}

            {/* Description */}
            <label className="block text-sm font-medium text-slate-500 !mt-6 !mb-2">
              Description
            </label>
            <textarea
              {...register("description", REQUIRED_VALIDATION("description"))}
                readOnly={isReadOnly}
              placeholder="Description"
              className="w-full min-h-[120px] resize-y rounded-2xl border border-slate-200 bg-white/80 !px-4 !py-3 text-slate-700 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300"
            />
            {errors.description && (
              <span className="text-red-700">
                {errors.description.message as string}
              </span>
            )}
            {/* Footer */}
           <div
  className={`mt-7 border-t border-slate-200 !pt-6 flex items-center ${
    mode === "view" ? "justify-end" : "justify-between"
  }`}
>
  {mode !== "view" && (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border border-black !px-5 !py-2.5 text-emerald-700 hover:bg-slate-50 active:translate-y-px"
      onClick={() => navigate("/dashboard/projects")}
    >
      Cancel
    </button>
  )}

  {mode === "view" ? (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className="inline-flex items-center justify-center rounded-full bg-slate-700 !px-6 !py-2.5 text-white hover:bg-slate-800"
    >
      Back
    </button>
  ) : (
    <button
      type="submit"
      disabled={isSubmitting || loadingOne}
      className="inline-flex items-center justify-center rounded-full bg-amber-500 !px-6 !py-2.5 text-white shadow-md hover:bg-amber-600 disabled:opacity-70"
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

export default ProjectsData;
