import axios from "axios";

const API_URL = process.env.BACKEND_URL as string;

export interface Task {
  id: number;
  description: string;
  isDone: boolean;
}

// Create Task
export const createTask = async (description: string) => {
  return axios.post(`${API_URL}/todo`, { "description":description });
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
