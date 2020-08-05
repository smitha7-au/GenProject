class Task {
    constructor(ID, TaskName, TaskDesc, DueDate, AssignedTo, Status) {
        this.ID = ID;
        this.TaskName = TaskName;
        this.TaskDesc = TaskDesc;
        this.DueDate = DueDate;
        this.AssignedTo = AssignedTo;
        this.Status = Status;

    }

    getAllTasks() {
        return `Task Id : ${this.ID} <br>
        Task Name: ${this.TaskName}<br>
        Task Description : ${this.TaskDesc}<br>
        Due Date : ${this.DueDate} <br>
        Assigned to: ${this.AssignedTo}<br>
        Status:  ${this.Status}`;

    }

}
const Task1 = new Task("100 \n", "Shopping \n", "Buy milk and cheese \n", "04/08/2020 \n", "John\n", "Done\n");
const Task2 = new Task("101 \n", "Gardening \n", "Water the plants \n", "05/08/2020 \n", "John\n", "In Progress\n");
const Task3 = new Task("102 \n", "Learn Html\n", "Work on the Tasks \n", "06/08/2020 \n", "John\n", "Review\n");
const Task4 = new Task("103 \n", "Learn CSS", "Work on the Tasks \n", "07/08/2020 \n", "John\n", "In Progress\n");
const Task5 = new Task("104 \n", "Learn JavaScript \n", "Work on the Tasks\n", "08/08/2020 \n", "John\n", "Done\n");
const Task6 = new Task("105 \n", "Learn JSON \n", "Work on the Tasks\n", "09/08/2020 \n", "John\n", "Review\n");

// Display all the tasks list in console

// console.log(Task1.getAllTasks());
// console.log(Task2.getAllTasks());
// console.log(Task3.getAllTasks());
// console.log(Task4.getAllTasks());
// console.log(Task5.getAllTasks());
// console.log(Task6.getAllTasks());

// To Display all the tasks list

document.getElementById("firstTask").innerHTML = Task1.getAllTasks();
document.getElementById("secondTask").innerHTML = Task2.getAllTasks();
document.getElementById("thirdTask").innerHTML = Task3.getAllTasks();
document.getElementById("fourthTask").innerHTML = Task4.getAllTasks();
document.getElementById("fifthTask").innerHTML = Task5.getAllTasks();
document.getElementById("sixthTask").innerHTML = Task6.getAllTasks();
