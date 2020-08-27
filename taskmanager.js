import Task from "./task.js"
export default class TaskManager {
    constructor(taskContainer) {
        this.tasks = JSON.parse(window.localStorage.getItem('mytasks')) || []; //Loads tasks from Local Storage to Task Manager.
        this.taskContainer = taskContainer;
        this.ID = parseInt(localStorage.getItem('currentId')) || 501;
        localStorage.setItem('currentId', this.ID);
    }


    addTask(name, desc, duedate, assignto, status) {
        const addNewTask = new Task(this.ID++, name, desc, duedate, assignto, status);
        this.tasks.push(addNewTask);

        //Adding tasks to Local Storage 
        localStorage.setItem('currentId', this.ID);
        localStorage.setItem('mytasks', JSON.stringify(this.tasks));
        return addNewTask;

    }


    deleteTask(id) {
        this.tasks = this.tasks.filter((h) => h.ID != id);
        //Deleting from Local storage      
        localStorage.setItem('mytasks', JSON.stringify(this.tasks));
    }


    editTask(taskId, name, desc, duedate, assignedTo, status) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].ID == taskId) {
                this.tasks[i].TaskName = name;
                this.tasks[i].TaskDesc = desc;
                this.tasks[i].DueDate = duedate;
                this.tasks[i].AssignedTo = assignedTo;
                this.tasks[i].Status = status;
                break;
            }
        }
        localStorage.setItem('mytasks', JSON.stringify(this.tasks));
    }

}