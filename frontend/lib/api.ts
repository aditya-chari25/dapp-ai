import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.BACKEND_URL;
console.log("local API url", API_URL)

export interface Task {
    id: number;
    description: string;
    isDone: boolean;
    deadline: number; // UNIX timestamp
}

// Create Task
export const createTask = async (description: string, deadline: number) => {
  const xyz =  axios.post(`${API_URL}/todo`, { description:description, deadline:deadline });
  console.log("response", xyz);
  return xyz
};

// Update Task
export const updateTaskStatus = async (taskId: number, isDone: boolean) => {
  return axios.patch(`${API_URL}/todo/${taskId}`, { taskId, isDone });
};

// Get All Tasks
export const getAllTasks = async (): Promise<Task[]> => {
  const response = await axios.get<Task[]>(`${API_URL}/todo`);
  return response.data;
};

export const deleteTask = async (taskId: number) => {
    try {
      const response = await axios.delete(`${API_URL}/todo/${taskId}`);
      console.log(`Task ${taskId} deleted successfully`);
      return response;
    } catch (error) {
      console.error(`Error deleting task ${taskId}:`, error);
      throw error;
    }
};
