import { useState } from "react";
import { createTask, updateTaskStatus, getAllTasks, Task } from "../lib/api";
import { GetServerSideProps } from "next";

interface Props {
  initialTasks: Task[];
}

export default function Home({ initialTasks }: Props) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // ✅ Loading state


  const fetchTasks = async () => {
    const updatedTasks = await getAllTasks();
    setTasks(updatedTasks);
  };

  const handleCreateTask = async () => {
        if (!newTask.trim()) return;
        setLoading(true); // Start loading
        try {
        await createTask(newTask);
        setNewTask("");
        await fetchTasks();
        } catch (error) {
        console.error("Error creating task:", error);
        } finally {
        setLoading(false); // Stop loading
        }
    };

  const handleUpdateTask = async (taskId: number, isDone: boolean) => {
    await updateTaskStatus(taskId, isDone);
    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="border p-2 flex-grow rounded"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={loading} // Disable input while loading

          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCreateTask}
            disabled={loading} // Disable button while loading
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded"
            >
              <span className={task.isDone ? "line-through" : ""}>
                {task.description}
              </span>
              <button
                className={`px-4 py-1 rounded ${
                  task.isDone ? "bg-red-500" : "bg-green-500"
                } text-white`}
                onClick={() => handleUpdateTask(task.id, !task.isDone)}
              >
                {task.isDone ? "Undo" : "Done"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ✅ Use `getServerSideProps` to fetch tasks before rendering the page
export const getServerSideProps: GetServerSideProps = async () => {
  const initialTasks = await getAllTasks();
  return { props: { initialTasks } };
};
