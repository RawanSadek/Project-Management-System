import {
  FiEdit2,
  FiEye,
  FiPlus,
  FiTrash2,
} from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { RiExpandUpDownLine } from "react-icons/ri";
import dataLoading from "../../../assets/Images/loading.gif";
import { useEffect, useState } from "react";
import type { ProjectTypes } from "../../../types/types";

import { HiDotsVertical } from "react-icons/hi";
import { axiosInstance, PROJECTS_URLS } from "../../../util/axios";
import { Link } from "react-router-dom";

const Projects = () => {
  let [projects, setProjects] = useState<ProjectTypes[]>([]);
  let [loading, setLoading] = useState(false);
 let [actionsOpen, setActionsOpen] = useState(false);
  let [rowIdx, setRowIdx] = useState<number>();

  let getProjects = async () => {
    try {
      setLoading(true);
      let response = await axiosInstance(PROJECTS_URLS.GET_ALL_PROJECTS);
      setProjects(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };


  useEffect(() => {
    getProjects();
  }, []);
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
        <Link
            to={"/dashboard/Project-data"}
           
          >
            
            Add New Project
          </Link>
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
  {loading && (
    <tr>
      <td colSpan={6} className="py-10">
        <img src={dataLoading} alt="loading" className="w-20 h-20 mt-3 mx-auto" />
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
                        <div className=" cursor-pointer absolute right-12 top-[70%] w-48 origin-top-right bg-white !py-3 shadow-lg border-1 border-gray-100 ring-opacity-5 z-50 rounded-2xl">
                          <div className=" !px-4 !py-2 text-sm ">
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2  hover:bg-slate-100">
                              <FiEye className=" text-emerald-600" /> 
                              <Link to={`/dashboard/project-data/${project.id}?mode=view`}>View</Link>

                            </button>
                          </div>
                          <div className=" !px-4 !py-2 text-sm">
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50">
                              <FiEdit2 className=" text-emerald-600" /> 
                              <Link to={`/dashboard/project-data/${project.id}?mode=edit`}>Edit</Link>
                            </button>
                          </div>
                          <div className=" !px-4 !py-2 text-sm ">
                            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50">
                           
                              <FiTrash2    className=" text-emerald-600" /> <span>Delete</span>
                            </button>
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
        {/* Delete Project  */}
     
    </>
  );
};

export default Projects;
