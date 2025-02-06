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
    this.provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_API_URL);
    this.wallet = new ethers.Wallet(myPrivateKey,this.provider);
    this.contract = new ethers.Contract(myContractKey, contractAbi, this.wallet);
  }

  // Create a new task
  async createTask(description: string) {
    const tx = await this.contract.createTask(description);
    await tx.wait();
    this.logger.log(`Task created: ${description}`);
    return { message: 'Task created successfully', txHash: tx.hash };
  }

  // Update task status
  async updateTaskStatus(taskId: number, isDone: boolean) {
    const tx = await this.contract.updateTaskStatus(taskId, isDone);
    await tx.wait();
    this.logger.log(`Task ${taskId} updated to ${isDone ? 'done' : 'not done'}`);
    return { message: 'Task updated successfully', txHash: tx.hash };
  }

  // Get a specific task
  async getTask(taskId: number) {
    const task = await this.contract.getTask(taskId);
    return { id: taskId, description: task[0], isDone: task[1] };
  }

  // Get all tasks
  async getAllTasks() {
    const [descriptions, statuses] = await this.contract.getAllTasks();
    return descriptions.map((desc, index) => ({
      id: index,
      description: desc,
      isDone: statuses[index],
    }));
  }
}
