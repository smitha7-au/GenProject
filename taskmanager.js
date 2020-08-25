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
        let myTasksInStore = JSON.parse(localStorage.getItem("mytasks")) || [];
        myTasksInStore.push(addNewTask);
        localStorage.setItem('mytasks', JSON.stringify(myTasksInStore));
        window.location.reload();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((h) => h.ID != id);
        //Deleting from Local storage
        let myTasksInStore = JSON.parse(localStorage.getItem('mytasks'));
        myTasksInStore = myTasksInStore.filter((h) => h.ID != id);
        localStorage.setItem('mytasks', JSON.stringify(myTasksInStore));
        window.location.reload();
    }

    editTask(taskId, name, desc, duedate, assignedTo, status) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].ID == taskId) {
                this.tasks[i].TaskName = name;
                this.tasks[i].TaskDesc = desc;
                this.tasks[i].DueDate = duedate;
                this.tasks[i].AssignedTo = assignedTo;
                this.tasks[i].Status = status;

                //Updating tasks in Local Storage
                let myTasksInStore = JSON.parse(localStorage.getItem('mytasks'));
                myTasksInStore[i].TaskName = name;
                myTasksInStore[i].TaskDesc = desc;
                myTasksInStore[i].AssignedTo = assignedTo;
                myTasksInStore[i].DueDate = duedate;
                myTasksInStore[i].Status = status;
                localStorage.setItem('mytasks', JSON.stringify(myTasksInStore));
                break;
            }
        }
        window.location.reload();
    }
}