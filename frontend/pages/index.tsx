import { useEffect, useState } from "react";
import { createTask, getAllTasks, deleteTask, Task } from "../lib/api";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>(""); // ✅ Store deadline
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const updatedTasks = await getAllTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Convert deadline to UNIX timestamp & send task
  const handleCreateTask = async () => {
    if (!newTask.trim() || !deadline.trim()) return;

    const unixDeadline = Math.floor(new Date(deadline).getTime() / 1000); // ✅ Convert date to UNIX
    console.log(unixDeadline);

    setLoading(true);
    try {
      await createTask(newTask, unixDeadline);
      setNewTask("");
      setDeadline("");
      await fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>

        {/* ✅ Show Loader */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}

        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={loading}
          />

          {/* ✅ Input for Deadline Date & Time */}
          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={loading}
          />

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleCreateTask}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>

        <button onClick={fetchTasks}>Get All Tasks</button>
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded"
            >
              <span>{task.description}</span>
              <span className="text-sm text-gray-500">
                {/* ✅ Convert UNIX to readable format */}
                {new Date(task.deadline * 1000).toLocaleString()}
              </span>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={() => deleteTask(task.id)}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Done"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
