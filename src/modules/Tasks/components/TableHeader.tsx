import { useNavigate } from "react-router-dom";

const TableHeader = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="bg-white !py-5 !px-8 text-3xl flex justify-between items-center">
          <h2>Tasks</h2>
          <button
            onClick={() => navigate("/dashboard/tasks-data")}
            type="button"
            className="bg-[#ef9b28] rounded-3xl text-white text-center hover:bg-[#ef9b28cc] !px-6 !py-2 text-sm w-50  "
          >
            + Add New Task
          </button>
        </div>
      </div>
    </>
  );
};

export default TableHeader;
