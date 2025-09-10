import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { axiosInstance, TASKS_URLS } from "../../../../util/axios";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "ToDo" | "InProgress" | "Done";
}

interface Column {
  id: "ToDo" | "InProgress" | "Done";
  title: string;
  taskIds: string[];
}

const EmployeeTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([
    { id: "ToDo", title: "To Do", taskIds: [] },
    { id: "InProgress", title: "In Progress", taskIds: [] },
    { id: "Done", title: "Done", taskIds: [] },
  ]);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(
          TASKS_URLS.GET_PROJECT_TASKS_MANAGER(100, 1)
        );
        const apiTasks: Task[] = response.data.data;
        // Map API data to Task[]
        const mappedTasks: Task[] = apiTasks.map((t) => ({
          id: String(t.id),
          title: t.title,
          description: t.description,
          status: t.status as "ToDo" | "InProgress" | "Done",
        }));
        setTasks(mappedTasks);
        // Build columns from tasks
        setColumns([
          {
            id: "ToDo",
            title: "To Do",
            taskIds: mappedTasks
              .filter((task: Task) => task.status === "ToDo")
              .map((task: Task) => task.id),
          },
          {
            id: "InProgress",
            title: "In Progress",
            taskIds: mappedTasks
              .filter((task: Task) => task.status === "InProgress")
              .map((task: Task) => task.id),
          },
          {
            id: "Done",
            title: "Done",
            taskIds: mappedTasks
              .filter((task: Task) => task.status === "Done")
              .map((task: Task) => task.id),
          },
        ]);
      } catch {
        // handle error
      }
    };
    fetchTasks();
  }, []);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggingTaskId(taskId);
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (
    e: React.DragEvent,
    columnId: "ToDo" | "InProgress" | "Done"
  ) => {
    e.preventDefault();
    if (!draggingTaskId) return;

    // Update task status
    const updatedTasks = tasks.map((task) =>
      task.id === draggingTaskId ? { ...task, status: columnId } : task
    );

    // Update columns
    const updatedColumns = columns.map((column) => {
      // Remove task from all columns
      const filteredTaskIds = column.taskIds.filter(
        (id) => id !== draggingTaskId
      );

      // Add to target column if it's the drop target
      if (column.id === columnId) {
        return { ...column, taskIds: [...filteredTaskIds, draggingTaskId] };
      }

      return { ...column, taskIds: filteredTaskIds };
    });

    setTasks(updatedTasks);
    setColumns(updatedColumns);
    setDraggingTaskId(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left underline cursor-pointer">
        Task Board
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) =>
            column.taskIds.includes(task.id)
          );

          return (
            <div
              key={column.id}
              className="rounded-xl bg-[#49716B] p-6 min-h-[500px] flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-100 text-left">
                {column.title}
              </h2>
              <div className="flex-1 flex flex-col gap-4">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className="bg-[#F4A025] rounded-lg px-6 py-4 flex items-center justify-between shadow cursor-grab"
                  >
                    <span className="text-white text-lg font-normal">
                      {task.title}
                    </span>
                    {(column.id === "ToDo" || column.id === "InProgress") && (
                      <FaRegEdit className="text-white text-xl ml-3" />
                    )}
                  </div>
                ))}
                {columnTasks.length === 0 && (
                  <div className="text-center py-4 text-gray-300">
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeTable;
