import { useContext } from "react";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthContext";
import Table from "../ManagerTasks/Table";
import TableHeader from "../ManagerTasks/TableHeader";
import EmployeeTable from "../EmployeeTasks/EmployeeTable";

const Tasks = () => {
  const { loginData } = useContext(AuthContext);
  console.log(loginData);

  return (
    <>
      {loginData?.roles[0] === "Manager" && (
        <div>
          <TableHeader />
          <div className="!px-4 !py-4">
            <Table />
          </div>
        </div>
      )}
      {loginData?.roles[3] === "Employee" && (
        <div className="container mx-auto p-4">
          <EmployeeTable />
        </div>
      )}
    </>
  );
};

export default Tasks;
