import { useState } from "react";
import { createTask, getAllTasks, deleteTask, Task } from "../lib/api";
import "../app/globals.css";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [del, setDel] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(data.response);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to the server.",);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteTask = async(id: number)=>{
    setDel(true);
    await deleteTask(id);
    setDel(false);
    await fetchTasks();
  }

  const handleCreateTask = async () => {
    if (!newTask.trim() || !deadline.trim()) return;

    const unixDeadline = Math.floor(new Date(deadline).getTime() / 1000);
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
    <div className="min-h-screen bg-gray-100 flex flex-row gap-8 items-center justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-stone-950 font-bold mb-4">Task Management List</h1>

        {/* ✅ Show Loader */}
        {loading && <p className="text-center text-blue-500">Loading...</p>}

        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            className="border p-2 rounded placeholder-stone-950  text-gray-900"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            disabled={loading}
          />

          <input
            type="datetime-local"
            className="border p-2 rounded placeholder-stone-950 text-gray-900"
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

        <button className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading} onClick={fetchTasks}>Get All Tasks</button>
        <ul> 
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded"
            >
              <span className="text-stone-500">{task.description}</span>
              <span className="text-sm text-gray-500">
                {new Date(task.deadline * 1000).toLocaleString()}
              </span>
              <button
                className="bg-red-500 text-white px-4 py-1 rounded"
                onClick={() => handleDeleteTask(task.id)}
                disabled={loading}
              >
                {del ? "Deleting" : "Not Completed"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl text-stone-950 font-bold text-center mb-4">Suggestions for Task Prioritisation</h1>

        <textarea
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300 text-gray-900"
          rows={4}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Send"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {response && (
          <div className="mt-4 p-3 bg-gray-200 rounded-lg">
            <p className="text-gray-900">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
