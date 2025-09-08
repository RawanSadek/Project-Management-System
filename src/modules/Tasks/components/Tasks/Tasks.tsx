import Table from "../Table";
import TableHeader from "./../TableHeader";

const Tasks = () => {
  return (
    <div>
      <TableHeader />
      <div className="!px-4 !py-4">
        <Table />
      </div>
    </div>
  );
};

export default Tasks;
