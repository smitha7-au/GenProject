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

class TaskManager {
    constructor(taskContainer) {
        this.ID = 501;
        this.tasks = [];
        this.taskContainer = taskContainer;
    }
    addTask(name, desc, duedate, assignto, status) {
        const addNewTask = new Task(this.ID++, name, desc, duedate, assignto, status);
        this.tasks.push(addNewTask);
        //Display Task
        this.display();
    }
    display() {
        this.taskContainer.innerHTML = "";
        this.tasks.forEach((t) => {
            this.taskContainer.append(t.toHTMLElement());
        });
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((h) => h.ID != id);
        this.display();
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
        this.display();
    }
}

// Accessing the DOM element to append bootsrap card
const taskContainer = document.querySelector("#tskContainer");
// Creating taskAdmin Object
var taskAdmin = new TaskManager(taskContainer);

taskAdmin.addTask("Shopping", "Buy milk and cheese", "04/08/2020", "John Smith", "Done");
taskAdmin.addTask("Gardening", "Water the plants", "05/08/2020", "Mary Smith", "In Progress");

////------------------------------------- Task 6 and 8 assignment/------------------------------------
document.querySelector('#frmAddTask').addEventListener('submit', (e) => {
    e.preventDefault();
    taskFormSubmitClick();
    clearModalFormValues();
    // hiding the form modal
    $('#taskModal').modal('hide');
    document.getElementById("taskModalLabel").innerHTML = "Add Task"
});

function taskFormSubmitClick() {
    // Getting the values form the modal
    var cardID = document.getElementById('task-id').value; // get the card ID from the hidden element
    var taskName = document.getElementById('txtTaskName').value;
    var taskDesc = document.getElementById('txtTaskDec').value;
    var taskAssignedTo = document.getElementById('txtTaskAssigned').value;
    var taskStatus = document.getElementById('selectStatus').value;
    var dueDate = document.getElementById('duedate').value;

    if (cardID != "") {
        //  'task-id' input element in the html has been assigned a value in the 'editTaskClicked' function
        taskAdmin.editTask(cardID, taskName, taskDesc, dueDate, taskAssignedTo, taskStatus);
    }
    else {
        // whe adding a new task, 'task-id' input element in the html will be blank. IE. Perform edit method when 'card-id' is not blank other wise it's an ADD TASK call.
        taskAdmin.addTask(taskName, taskDesc, dueDate, taskAssignedTo, taskStatus);
    }
}

function clearModalFormValues() {
    document.getElementById('task-id').value = ""; // Make hidden element task-id to blank aswewll.
    document.getElementById('txtTaskName').value = "";
    document.getElementById('txtTaskDec').value = "";
    document.getElementById('txtTaskAssigned').value = "";
    document.getElementById('selectStatus').value = "";
    document.getElementById('duedate').value = "";
}
////-------------------------------------END OF Task 6 assignment/------------------------------------


//-------------------------------------- Task 7 assignment------------------------------------
function deleteTaskClicked(event) {
    const taskElement = event.target.closest('.card');
    taskAdmin.deleteTask(taskElement.attributes.id.value);
}
//-------------------------------------- End of Task 7 assignment------------------------------------

//--------------------------------------- Task 8 assignement-----------------------------------------
function editTaskClicked() {
    const taskElement = event.target.closest('.card');  // Retrieving an Html element where class name = 'card'
    const cardID = taskElement.attributes.id.value;     // Getting html element attribute value    

    const updateTaskRecord = taskAdmin.tasks.find((tc) => cardID == tc.ID); // Retreving the task object from the tasks array using inbuld 'find' function of the array.
    // Assign Card ID value to the hidden input html element, So when 'submit' button is clicked it knows what to perform (Add or Edit)
    document.getElementById('task-id').value = cardID;
    document.getElementById('txtTaskName').value = updateTaskRecord.TaskName;
    document.getElementById('txtTaskDec').value = updateTaskRecord.TaskDesc;
    document.getElementById('txtTaskAssigned').value = updateTaskRecord.AssignedTo;
    document.getElementById('selectStatus').value = updateTaskRecord.Status;
    document.getElementById('duedate').value = updateTaskRecord.DueDate;


    document.getElementById("taskModalLabel").innerHTML = "Update Task"
    $('#taskModal').modal('show');
}