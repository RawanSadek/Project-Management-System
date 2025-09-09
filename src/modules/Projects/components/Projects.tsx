import { FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { RiExpandUpDownLine } from "react-icons/ri";
import dataLoading from "../../../assets/Images/dataLoading.gif";

import { useEffect, useState } from "react";
import type { ProjectTypes } from "../../../types/types";

import { HiDotsVertical } from "react-icons/hi";
import { axiosInstance, PROJECTS_URLS } from "../../../util/axios";
import { Link } from "react-router-dom";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import noData from "../../../assets/Images/no-data.jpg";
import DeleteConfirmation from "../../shared/components/DeleteConfirmation/DeleteConfirmation";
import { toast } from "react-toastify";

const Projects = () => {
  let [projects, setProjects] = useState<ProjectTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  let [actionsOpen, setActionsOpen] = useState(false);
  let [rowIdx, setRowIdx] = useState<number>();
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(1);
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(1);
  const totalPages = totalNumberOfPages;
  const pageSizes = [5, 8, 10, 12, 20];

  let getProjects = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance.get(PROJECTS_URLS.GET_ALL_PROJECTS, {
        params: { pageSize, pageNumber: page },
      });
      setProjects(response.data.data);
      setTotalNumberOfPages(response.data.totalNumberOfPages);
      setTotalNumberOfRecords(response.data.totalNumberOfRecords);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const deleteProject = async (id: number) => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(PROJECTS_URLS.DELETE_PROJECTS(id));
      toast.success(response.data.message || "Project deleted successfully");
      getProjects();
     } catch (error: any) {
      toast.error(error?.response?.data?.message || "Try Again");
    }
    setLoading(false);
  };
  useEffect(() => {
    getProjects();
  }, [pageSize, page]);
  return (
    <>
      <div className="bg-white !py-5 !px-8 text-3xl flex justify-between ">
        <h2>Projects</h2>
        <button
          className="inline-flex items-center gap-2.5 rounded-full bg-amber-500  !px-5 !py-3
               text-white text-base font-medium shadow-md hover:bg-amber-600
               focus:outline-none focus:ring-2 focus:ring-amber-300 active:translate-y-px cursor-pointer"
        >
          <FiPlus />
          <Link to={"/dashboard/Project-data"}>Add New Project</Link>
        </button>
      </div>
      <div className="bg-white !my-5 !mx-8 text-3xl rounded-lg">
        {/* Search Container */}
        <div className="!p-4">
          <div className="flex justify-start items-center gap-2 border border-gray-400 lg:w-[20%] rounded-full !px-3 !py-1">
            <GoSearch className="text-lg text-gray-700" />
            <input
              id="price"
              type="text"
              name="price"
              placeholder="Search By Title"
              className="min-w-0 grow py-1.5 pr-3 pl-1 text-base placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
            />
          </div>
        </div>
        {/* table */}

        <table className="w-full">
          <thead className="bg-[#315951E5]">
            <tr className="text-sm text-white">
              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  Title <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  Statues <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  Description <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e  border-black">
                <div className="flex items-center">
                  Creation Date <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4 border-e border-black">
                <div className="flex items-center">
                  Modificatio Date{" "}
                  <RiExpandUpDownLine className="!ms-2 text-lg" />
                </div>
              </th>

              <th className="font-light !p-4"></th>
            </tr>
          </thead>

          <tbody>
            {/* Loading */}
            {loading && (
              <tr>
                <td colSpan={7} className="!py-10">
                  <img
                    src={dataLoading}
                    alt="loading"
                    className="w-20 h-20 !mt-3 !mx-auto"
                  />
                </td>
              </tr>
            )}

            {/* No Data */}
            {!loading && projects.length == 0 && (
              <tr>
                <td colSpan={7} className="!py-10 text-center">
                  <img
                    src={noData}
                    className="!mx-auto w-[40%]"
                    alt="no data"
                  ></img>
                  <h3 className="font-bold">No Data Found!</h3>
                </td>
              </tr>
            )}
            {!loading && (
              <>
                {projects?.map((project: ProjectTypes) => (
                  <tr
                    key={project.id}
                    className="odd:bg-white even:bg-[#F5F5F5] text-sm"
                  >
                    <td className="!p-4">{project?.title}</td>
                    <td className="!p-4 ">
                      {project?.isActivated == true ? (
                        <div className="rounded-2xl bg-[#009247] w-fit !py-1 !px-3 text-white font-light">
                          Public
                        </div>
                      ) : (
                        <div className="rounded-2xl bg-[#922E25B2] w-fit !py-1 !px-3 text-white font-light">
                          In Public
                        </div>
                      )}
                    </td>
                    <td className="!p-4">{project?.description}</td>
                    <td className="!p-4">
                      {new Date(project?.creationDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="!p-4">
                      {new Date(project?.modificationDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="!p-4 relative">
                      <HiDotsVertical
                        onClick={() => {
                          setActionsOpen(!actionsOpen);
                          setRowIdx(project?.id);
                        }}
                        className="text-xl cursor-pointer"
                      />
                      {actionsOpen && rowIdx == project?.id && (
                        <div className="absolute right-12 top-[70%] w-48 origin-top-right bg-white !py-3 shadow-lg border-1 border-gray-100 ring-opacity-5 z-10 rounded-2xl">
                          <div className="w-full flex items-center gap-2 !px-2 !py-0.5 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                          
                            <button className="flex w-full items-center gap-2 rounded-lg !px-2 !py-2  hover:bg-slate-100  cursor-pointer">
                              <FiEye className=" text-emerald-600" />
                              <Link
                                to={`/dashboard/project-data/${project.id}?mode=view`}
                              >
                                View
                              </Link>
                            </button>
                          </div>
                          <div className="w-full flex items-center gap-2 !px-2 !py-0.5 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                            <button className="flex w-full items-center gap-2 rounded-lg !px-2 !py-2 hover:bg-slate-50">
                              <FiEdit2 className=" text-emerald-600" />
                              <Link
                                to={`/dashboard/project-data/${project.id}?mode=edit`}
                              >
                                Edit
                              </Link>
                            </button>
                          </div>
                          <div className="w-full flex items-center gap-2 !px-2 !py-0.5 text-sm hover:bg-[#F8F9FB] cursor-pointer">
                            <button className="flex w-full items-center gap-2 rounded-lg !px-2 !py-2 hover:bg-slate-50 cursor-pointer">
                              <FiTrash2 className=" text-emerald-600" />{" "}
                              <span   onClick={() => {
                                  setDeleteConfirmationOpen(true);
                                }}>Delete</span>
                            </button>
                          </div>
                            <DeleteConfirmation
                              isOpen={deleteConfirmationOpen}
                              onClose={() => setDeleteConfirmationOpen(false)}
                              onDelete={() => {
                                deleteProject(project.id);
                                setDeleteConfirmationOpen(false);
                              }}
                            />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
          <tfoot className="border-t border-gray-200 ">
            <tr className="text-right">
              <td colSpan={7} className="!pt-5 !pb-2 !px-5">
                {/** Pagination Controls */}
                <div className="flex justify-end items-center mt-4 text-gray-600 text-sm">
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
                        <IoIosArrowDown className="text-lg" />
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
                      Page <span className="font-semibold !mx-1">{page}</span>{" "}
                      of{" "}
                      <span className="font-semibold !mx-1">{totalPages}</span>
                    </span>
                    <button
                      className="rounded-full px-2 py-1 text-xl text-gray-400 hover:text-gray-700 disabled:opacity-50"
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                    >
                      <TfiAngleLeft className="cursor-pointer" />
                    </button>
                    <button
                      className="rounded-full px-2 py-1 text-xl text-gray-400 hover:text-gray-700 disabled:opacity-50"
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                    >
                      <TfiAngleRight className="cursor-pointer" />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Projects;
