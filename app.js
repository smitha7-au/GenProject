var taskId;
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

class Task {
    constructor(ID, name, desc, date, assignedTo, status) {
        this.ID = ID;
        this.TaskName = name;
        this.TaskDesc = desc;
        this.DueDate = date;
        this.AssignedTo = assignedTo;
        this.Status = status;
    }

    toHTMLElement() {
        const htmlStr = this.toHTMLString();
        const element = document.createRange().createContextualFragment(htmlStr);
        element
            .querySelector("button.edit")
            .addEventListener("click", editTaskClicked);
        element
            .querySelector("button.delete")
            .addEventListener("click", deleteTaskClicked);

        return element;
    }

    toHTMLString() {
        const htmlString = `
        <div class="card border-info mt-2">
            <div id ="${this.ID}" class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-8">
                            <h5 class="card-title">${this.TaskName}</h5>
                        </div>
                        <div class="col-md-4">
                            <h5 class="dueDateLabel">Due Date: ${this.DueDate}</h5>                        
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <label for="forTaskDescription">
                        <dt>Description</dt>
                    </label>
                    <div class="overflow-auto border">
                        <p class="card-text">${this.TaskDesc}</p>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6 border">
                            <label for="forAssignedTo">
                                <dt>Assigned To</dt>
                            </label>
                            <p>${this.AssignedTo}</p>
                        </div>
                        <div class="col-md-6 border">
                            <label for="selectStatus">
                                <dt>Status</dt>
                            </label>
                            <p>${this.Status}</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="edit btn-primary btn-lg float-right ml-2"><i class="far fa-edit"></i></button>
                    <button class="delete btn-danger btn-lg float-right"><i class="fa fa-trash"></i></button>                
                </div>
            </div>
      </div>`;
        return htmlString;
    }
}

// java script task class object
class TaskManager {
    constructor(parent) {
        this.ID = 501;
        this.tasks = [];
        this.parent = parent;
    }

    //Add task method
    addTask(name, desc, duedate, assignedto, status) {
        const addNewTask = new Task(this.ID++, name, desc, duedate, assignedto, status);
        this.tasks.push(addNewTask);
    }

    display() {
        // refreshes the page after adding        
        this.parent.innerHTML = "";
        this.tasks.forEach((t) => {
            this.parent.append(t.toHTMLElement());

        });
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((h) => h.ID != id);
    }

    //Edit method
    UpdateTask(id, name, desc, duedate, assignedto, status) {
        for (var i = 0; this.tasks.length; i++) {
            if (this.tasks[i].ID == id) {
                this.tasks[i].TaskName = name;
                this.tasks[i].TaskDesc = desc;
                this.tasks[i].DueDate = duedate;
                this.tasks[i].AssignedTo = assignedto;
                this.tasks[i].Status = status;
                break;
            }
        }
        this.display();
        //return true;
    }

} // end of Task Manager Class

const allTasks = document.querySelector('#tskContainer');
const taskAdmin = new TaskManager(allTasks); //Create an object for the TaskManager

const taskForm = document.querySelector("#frmAddTask");
taskForm.addEventListener("submit", taskFormSubmitted);

var InputTaskID = document.querySelector("#task-id");

var btnAddTask = document.querySelector("#btnAddTask");
btnAddTask.addEventListener("click", btnAddTaskClicked);

function btnAddTaskClicked(event) {
    InputTaskID = 0;
    clearModalFields();
    document.getElementById("btnSubmit").innerHTML = "Save";
}

function addTask(name, desc, duedate, assignedto, status) {
    taskAdmin.addTask(name, desc, duedate, assignedto, status);
}

addTask("Shopping", "Buy milk and cheese", "04/08/2020", "John", "Done");
addTask("Gardening", "Water the plants", "05/08/2020", "Das", "In Progress");
taskAdmin.display();

document.querySelector('#frmAddTask').addEventListener('submit', (e) => {
    e.preventDefault();
    taskFormSubmitClick();
});

function taskFormSubmitClick() {
    TaskName = document.getElementById('txtTaskName').value;
    TaskDesc = document.getElementById('txtTaskDec').value;
    AssignedTo = document.getElementById('txtTaskAssigned').value;
    Status = document.getElementById('selectStatus').value;
    if (InputTaskID > 0) {
        DueDate = document.getElementById('duedate').value;
        taskAdmin.UpdateTask(InputTaskID, TaskName, TaskDesc, DueDate, AssignedTo, Status);
    }
    else {
        console.log("add task: " + TaskName);
        DueDate = document.getElementById('duedate').value;//.split('T')[0];
        addTask(TaskName, TaskDesc, DueDate, AssignedTo, Status);
        //clear the fields
        clearModalFields();
        taskAdmin.display(); // Now display the card that's added
    }
}

function clearModalFields() {
    document.getElementById('txtTaskName').value = "";
    document.getElementById('txtTaskDec').value = "";
    document.getElementById('duedate').value = "";
    document.getElementById('txtTaskAssigned').value = "";
    document.getElementById('selectStatus').value = "";
}

function editTaskClicked() {
    const taskElement = event.target.closest('.card');
    //console.log(taskElement.attributes.id.value);
    InputTaskID = taskElement.attributes.id.value

    const task = taskAdmin.tasks.find((tc) => InputTaskID == tc.ID);
    document.getElementById('txtTaskName').value = task.TaskName;
    document.getElementById('txtTaskDec').value = task.TaskDesc
    document.getElementById('duedate').value = task.DueDate
    document.getElementById('txtTaskAssigned').value = task.AssignedTo;
    document.getElementById('selectStatus').value = task.Status;

    $('#taskModal').modal('show');
    document.getElementById("btnSubmit").innerHTML = "Update";
    taskFormSubmitClick(InputTaskID);
}

function deleteTaskClicked(event) {
    //const element = event.target;    
    const taskElement = event.target.closest('.card');
    //console.log(taskElement.attributes.id.value);
    taskAdmin.deleteTask(taskElement.attributes.id.value);
    taskAdmin.display();
}

function taskFormSubmitted(event) {
    event.preventDefault();
    $('#taskModal').modal('hide');
}