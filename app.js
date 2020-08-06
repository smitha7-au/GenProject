(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);

})();

function CaptureValues() {
    var TaskName, TaskDesc, DueDate, AssignedTo, Status;
    // assigning the input values in to the domain variables.
    TaskName = document.getElementById('txtTaskName').value;
    TaskDesc = document.getElementById('txtTaskDec').value;
    DueDate = document.getElementById('duedate').value;
    AssignedTo = document.getElementById('txtTaskAssigned').value;
    Status = document.getElementById('selectStatus').value;

    //  alert(TaskName, TaskDesc, DueDate, AssignedTo, Status);

    // Create an object of a task now and pass the input values 
    var taskAdmin = new TaskManager();
    taskAdmin.addTask(TaskName, TaskDesc, DueDate, AssignedTo, Status);
    addTaskToHTML(TaskName);// This method is now updating the html page with the input values
}

function addTaskToHTML(name) { // }, desc, duedate, assignedto, status) {
    alert(name);
    document.getElementById("taskname1").innerHTML = name;
}

class Task {
    constructor(ID, name, desc, date, assignedTo, status) {
        this.ID = ID;
        this.TaskName = name;
        this.TaskDesc = desc;
        this.DueDate = date;
        this.AssignedTo = assignedTo;
        this.Status = status;
    }
}

// java script task class object
class TaskManager {
    constructor() {
        this.ID = 501;
        this.tasks = [];
    }

    // This method is used to Display all the tasks on the console.
    getAllTasks() {
        //return this.tasks;
        for (var i = 0; i < taskAdmin.tasks.length; i++) {
            if (i === this.tasks.length) { break; }
            console.log(this.tasks[i]);
        }
    }

    //Add task method
    addTask(name, desc, duedate, assignedto, status) {
        const addNewTask = new Task(this.ID++, name, desc, duedate, assignedto, status);
        this.tasks.push(addNewTask);
    }

    //Edit method
    UpdateTask(id, name, desc, duedate, assignedto, status) {
        for (var i = 0; this.tasks.length; i++) {
            if (this.tasks[i].ID === id) {
                this.tasks[i].TaskName = name;
                this.tasks[i].TaskDesc = desc;
                this.tasks[i].DueDate = duedate;
                this.tasks[i].AssignedTo = assignedto;
                this.tasks[i].Status = status;
                break;
            }
        }
    }

    //delete task method
    deleteTask(id) {
        this.tasks = this.tasks.filter((h) => h.ID !== id);
        //this.tasks.pop() // pop method only deletes the last record from the array. So we cant use this.
    }

    // get task info method by status
    getTaskInfoWithStatus(Lstatus) {
        var strTaskInfoForStatus;
        for (var i = 0; this.tasks.length; i++) {
            if (i === this.tasks.length) { break; }
            if (this.tasks[i].Status === Lstatus) {
                strTaskInfoForStatus += "<br/>Task Id is: " + this.tasks[i].ID + " | Task name is:  " + this.tasks[i].TaskName + " | Task Description is:  " + this.tasks[i].TaskDesc + " | Due date is:  " + this.tasks[i].DueDate
                    + " | Assigned to: " + this.tasks[i].AssignedTo + " | Status:  " + this.tasks[i].Status;
            }
        }
        return strTaskInfoForStatus;
    }

    // Below methods are used to display on the html page
    getAllTasksForHTML() {
        var AllTasksInfo;
        for (var i = 0; i < taskAdmin.tasks.length; i++) {
            //if (i === this.tasks.length) { break; }
            AllTasksInfo += ("<br />Task Id: " + this.tasks[i].ID + " | Task name:  " + this.tasks[i].TaskName + " | Task Description:  " + this.tasks[i].TaskDesc + " | Due date:  " + this.tasks[i].DueDate
                + " | Assigned to: " + this.tasks[i].AssignedTo + " | Status:  " + this.tasks[i].Status);
        }
        return AllTasksInfo;
    }
} // end of Task Manager Class

/*
var taskAdmin = new TaskManager();
//------------------------------------------- Adding tasks---------------------------------------------------
taskAdmin.addTask("Shopping", "Buy milk and cheese", "04/08/2020", "John", "Done");
taskAdmin.addTask("Gardening", "Water the plants", "05/08/2020", "Das", "In Progress");
taskAdmin.addTask("Learn Html", "Submit task 1", "06/08/2020", "Mark", "Review");
taskAdmin.addTask("Learn CSS", "Practise CSS", "07/08/2020", "Mary", "In Progress");
taskAdmin.addTask("Learn JavaScript", "Work on sprin1 task 5", "08/08/2020", "Adam", "Done");
taskAdmin.addTask("Learn JSON", "how to create JSON objects", "09/08/2020", "Brown", "Review");
//---------------------------------- Display on HTML page All the Tasks----------------------------------------
document.getElementById("DisplayAllTasksHeader").innerHTML = "Below are the 6 tasks added successfully";
document.getElementById("AllTasks").innerHTML = taskAdmin.getAllTasksForHTML();
//-------------------------------------- Now calling the Edit method-------------------------------------------
taskAdmin.UpdateTask(501, "Shopping", "Buy milk and cheese", "04 / 08 / 2020", "John K Smith", "Done");
// Display on HTML page after Editing
document.getElementById("UpdateTasksHeader").innerHTML = "Updating Assigned to from 'John' to 'John K Smith' for the record with ID 501.";
document.getElementById("AllTasksAfterUpdate").innerHTML = taskAdmin.getAllTasksForHTML();
// --------------------------------------- Now calling delete method ------------------------------------------------
taskAdmin.deleteTask(502);
document.getElementById("DeleteTasksHeader").innerHTML = "Below are the results after deleting record with ID 502.";
document.getElementById("AllTasksAfterDelete").innerHTML = taskAdmin.getAllTasksForHTML();
// --------------------------------------- Now calling getTaskInfoWithStatus method ---------------------------
// To display in HTML
document.getElementById("GetTasksStatusHeader").innerHTML = "Below are the results of all the records where the status is in 'Review' status.";
document.getElementById("AllTasksWithStatus").innerHTML = taskAdmin.getTaskInfoWithStatus("Review");
*/