import TaskManager from "./taskmanager.js"

// Accessing the DOM element to append bootsrap card
const taskContainer = document.querySelector("#tskContainer");
// Creating taskAdmin Object
var taskAdmin = new TaskManager(taskContainer);


//Loading Tasks from Storage, So pass the parameter as "0".
displayTasks(0);

// get the HTML element for the drop down list
const getStatus = document.getElementById('GetByStatus');
// Now add the event listener when changing the selected value 
getStatus.addEventListener('change', (e) => {
    e.preventDefault();
    let status = getStatus.options[getStatus.selectedIndex].value;

    if (status === "All")
        taskAdmin.tasks = JSON.parse(window.localStorage.getItem('mytasks')) || [];
    else   // filter out the unwanted status's records
        taskAdmin.tasks = taskAdmin.tasks.filter((h) => h.Status == status);

    displayTasks(1);
    // Now set the tasks array from the local storage after every slected value from the list
    taskAdmin.tasks = JSON.parse(window.localStorage.getItem('mytasks')) || [];
});

// Add task button click event listener. when clicked on 'Add Task' button, the label for the model has to change it back to 'Add Task'
document.querySelector('#btnAddTask').addEventListener('click', (e) => {
    e.preventDefault();
    clearModalFormValues(); // DONT DELETE THIS FUNCTION. THIS WILL CLEAR THE MODAL VALUES WHEN ADD TASK IS CLICKED
    document.getElementById("taskModalLabel").innerHTML = "Add Task"
    console.log(document.getElementById("taskModalLabel").innerHTML);
});



document.querySelector('#frmAddTask').addEventListener('submit', (e) => {
    e.preventDefault(); // It prevent's from displayng the default values.
    taskFormSubmitClick();

    // hiding the form modal
    $('#taskModal').modal('hide');
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
    displayTasks(0); //call function to refresh the page from the storage
}



function deleteTaskClicked(event) {
    //Confirmation before deleting the task
    if (confirm('Are you sure you want to delete the task?')) {
        const taskElement = event.target.closest('.card');
        taskAdmin.deleteTask(taskElement.attributes.id.value);
        displayTasks(0);
    } else {
        console.log('Task was not deleted');
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

//Displaying Tasks from Storage
function displayTasks(IsArray) {
    taskContainer.innerHTML = "";
    let myTaskLists;
    if (IsArray === 1) {
        myTaskLists = taskAdmin.tasks;
    }
    else {
        myTaskLists = JSON.parse(window.localStorage.getItem('mytasks'));
    }

    if (myTaskLists) {
        for (let i = 0; i < myTaskLists.length; i++) {
            let formatDate = new Date(myTaskLists[i].DueDate).toLocaleString("en-AU");
            let htmlStr = `
        <div class="card border-info mt-2">
            <div id ="${myTaskLists[i].ID}" class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-8">
                            <h5 class="card-title">${myTaskLists[i].TaskName}</h5>
                        </div>
                        <div class="col-md-4">
                            <h5 class="dueDateLabel">Due Date: ${formatDate}</h5>                        
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <label for="forTaskDescription">
                        <dt>Description</dt>
                    </label>
                    <div class="overflow-auto border">
                        <p class="card-text">${myTaskLists[i].TaskDesc}</p>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6 border">
                            <label for="forAssignedTo">
                                <dt>Assigned To</dt>
                            </label>
                            <p>${myTaskLists[i].AssignedTo}</p>
                        </div>
                        <div class="col-md-6 border">
                            <label for="selectStatus">
                                <dt>Status</dt>
                            </label>
                            <p>${myTaskLists[i].Status}</p>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="edit btn-primary btn-lg float-right ml-2"><i class="far fa-edit"></i></button>
                    <button class="delete btn-danger btn-lg float-right"><i class="fa fa-trash"></i></button>                
                </div>
            </div>
        </div>`;
            const element = document.createRange().createContextualFragment(htmlStr);
            element
                .querySelector("button.edit")
                .addEventListener("click", editTaskClicked);
            element
                .querySelector("button.delete")
                .addEventListener("click", deleteTaskClicked);

            taskContainer.appendChild(element);

        }
    }
} // end of displayTasks function 