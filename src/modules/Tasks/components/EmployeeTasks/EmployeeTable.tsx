import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "inprogress" | "done";
}

interface Column {
  id: "todo" | "inprogress" | "done";
  title: string;
  taskIds: string[];
}

const EmployeeTable = () => {
  const initialTasks: Task[] = [
    {
      id: "1",
      title: "Login UI",
      description: "Design login interface",
      status: "todo",
    },
    {
      id: "2",
      title: "Login Integration",
      description: "Connect to backend API",
      status: "todo",
    },
    {
      id: "3",
      title: "Register UI",
      description: "Design registration interface",
      status: "inprogress",
    },
    {
      id: "4",
      title: "Register Integration",
      description: "Connect to backend API",
      status: "todo",
    },
    {
      id: "5",
      title: "Login UI",
      description: "Final design implementation",
      status: "done",
    },
  ];

  const initialColumns: Column[] = [
    { id: "todo", title: "To Do", taskIds: ["1", "2", "4"] },
    { id: "inprogress", title: "In Progress", taskIds: ["3"] },
    { id: "done", title: "Done", taskIds: ["5"] },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

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
    columnId: "todo" | "inprogress" | "done"
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

  const getColumnColor = (columnId: string) => {
    switch (columnId) {
      case "todo":
        return "border-red-200 bg-red-50";
      case "inprogress":
        return "border-yellow-200 bg-yellow-50";
      case "done":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getTaskColor = (columnId: string) => {
    switch (columnId) {
      case "todo":
        return "border-red-400 hover:border-red-600";
      case "inprogress":
        return "border-yellow-400 hover:border-yellow-600";
      case "done":
        return "border-green-400 hover:border-green-600";
      default:
        return "border-gray-400 hover:border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
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
              className={`rounded-lg border-2 p-4 ${getColumnColor(column.id)}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-700 flex items-center justify-between">
                {column.title}
                <span className="text-sm font-medium px-2 py-1 rounded-full bg-white">
                  {columnTasks.length} tasks
                </span>
              </h2>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    className={`p-3 rounded border-l-4 bg-white shadow-sm cursor-grab ${getTaskColor(
                      column.id
                    )}`}
                  >
                    <h3 className="font-medium text-gray-800">{task.title}</h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No tasks in this column
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>Drag and drop tasks between columns to change their status.</p>
      </div>
    </div>
  );
};

export default EmployeeTable;
