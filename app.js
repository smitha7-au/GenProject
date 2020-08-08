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
        this.tasks.forEach((task) => {
            this.parent.append(task.toHTMLElement());

        });
    }
    deleteTask(id) {
        console.log(id);
        this.tasks = this.tasks.filter((h) => h.ID != id);
        console.log("tasks length : " + this.tasks.length);
    }

} // end of Task Manager Class

var allTasks = document.querySelector('#tskContainer');
var taskAdmin = new TaskManager(allTasks); //Create an object for the TaskManager

var taskForm = document.querySelector("#frmAddTask");
taskForm.addEventListener("submit", taskFormSubmitted);

function addTask(name, desc, duedate, assignedto, status) {
    taskAdmin.addTask(name, desc, duedate, assignedto, status);
}

addTask("Shopping", "Buy milk and cheese", "04/08/2020", "John", "Done");
addTask("Gardening", "Water the plants", "05/08/2020", "Das", "In Progress");
taskAdmin.display();

document.querySelector('#frmAddTask').addEventListener('submit', (e) => {
    e.preventDefault();
    CaptureValuesFromModal();
});

function CaptureValuesFromModal() {
    TaskName = document.getElementById('txtTaskName').value;
    TaskDesc = document.getElementById('txtTaskDec').value;
    DueDate = document.getElementById('duedate'); //.value.split('T')[0];
    AssignedTo = document.getElementById('txtTaskAssigned').value;
    Status = document.getElementById('selectStatus').value;
    addTask(TaskName, TaskDesc, DueDate, AssignedTo, Status);
    taskAdmin.display(); // Now display the cart that's added
    //clear the fields
    clearModalFields();
}

function clearModalFields() {
    document.getElementById('txtTaskName').value = "";
    document.getElementById('txtTaskDec').value = "";
    document.getElementById('duedate').value = "";
    document.getElementById('txtTaskAssigned').value = "";
    document.getElementById('selectStatus').value = "";
}

function taskFormSubmitted(event) {
    event.preventDefault();
    $('#taskModal').modal('hide');
}

function editTaskClicked() {
    const taskElement = event.target.closest('.task');
    const task = taskAdmin.tasks.find((t) => taskElement.id == t.id);
    console.log(task);
}

function deleteTaskClicked(event) {
    //const element = event.target;    
    const taskElement = event.target.closest('.card');
    //console.log(taskElement.attributes.id.value);
    taskAdmin.deleteTask(taskElement.attributes.id.value);
    taskAdmin.display();
}