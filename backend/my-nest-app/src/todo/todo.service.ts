import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import contractAbi from '../abi/todo.json';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TodoService {
  private provider: ethers.providers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  private readonly logger = new Logger(TodoService.name);

  constructor() {
    dotenv.config();
    const myPrivateKey: string = process.env.PRIVATE_KEY as string;
    const myContractKey: string = process.env.CONTRACT_ADDRESS as string;
    console.log(myContractKey)
    this.provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API_URL);
    this.wallet = new ethers.Wallet(myPrivateKey,this.provider);
    this.contract = new ethers.Contract(myContractKey, contractAbi, this.wallet);
  }

  // Create a new task
  async createTask(description: string, deadline: number){
    try {
      const tx = await this.contract.createTask(description, deadline);
      await tx.wait(); // Wait for transaction confirmation
      return { message: "Task created successfully!", transactionHash: tx.hash };
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task.");
    }
  }

  // Update task status
  async deleteTask(taskId: number){
    try {
      const tx = await this.contract.completeTask(taskId);
      await tx.wait(); // Wait for transaction confirmation
      return { message: `Task ${taskId} deleted successfully!`, transactionHash: tx.hash };
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Failed to delete task.");
    }
  }

  async getAllTasks(){
    try {
      const tasks = await this.contract.getAllTasks();
      return tasks.map((task) => ({
        id: Number(task.id),
        description: task.description,
        isDone: task.isDone,
        deadline: Number(task.deadline),
      }));
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks.");
    }
  }
}
  
  // ✅ Create a New Task


  // ✅ Get All Task
  // ✅ Mark Task as Done & Remove from Blo