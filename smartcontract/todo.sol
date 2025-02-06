// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    struct Task {
        string description;
        bool isDone;
    }

    Task[] public tasks;

    // Event to emit when a task is created or updated
    event TaskUpdated(uint taskId, bool isDone);

    // Function to create a new task
    function createTask(string memory _description) public {
        tasks.push(Task(_description, false)); // Default task status to 'not done'
    }

    // Function to update task status (done or not done)
    function updateTaskStatus(uint _taskId, bool _isDone) public {
        require(_taskId < tasks.length, "Task does not exist");
        tasks[_taskId].isDone = _isDone;
        emit TaskUpdated(_taskId, _isDone);
    }

    // Function to get the details of a specific task
    function getTask(uint _taskId) public view returns (string memory, bool) {
        require(_taskId < tasks.length, "Task does not exist");
        Task memory task = tasks[_taskId];
        return (task.description, task.isDone);
    }

    // Function to get all tasks and their details
    function getAllTasks() public view returns (string[] memory, bool[] memory) {
        uint taskCount = tasks.length;
        string[] memory descriptions = new string[](taskCount);
        bool[] memory statuses = new bool[](taskCount);

        for (uint i = 0; i < taskCount; i++) {
            descriptions[i] = tasks[i].description;
            statuses[i] = tasks[i].isDone;
        }

        return (descriptions, statuses);
    }

    // Function to get the total number of tasks
    function getTotalTasks() public view returns (uint) {
        return tasks.length;
    }
}
