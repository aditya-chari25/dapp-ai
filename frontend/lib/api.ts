import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.BACKEND_URL;
console.log("local API url", API_URL)

export interface Task {
  id: number;
  description: string;
  isDone: boolean;
}

// Create Task
export const createTask = async (description: string) => {
  const xyz =  axios.post(`${API_URL}/todo`, { description:description });
  console.log("response", xyz);
  return xyz
};

// Update Task
export const updateTaskStatus = async (taskId: number, isDone: boolean) => {
  return axios.patch(`${API_URL}/todo/${taskId}`, { taskId, isDone });
};

// Get All Tasks
export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>("http://localhost:8000/todo");
  return response.data;
};
