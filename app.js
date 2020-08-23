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
//End of Task Class



class TaskManager {
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
        myTasksInStore = myTasksInStore.filter((h) => h.ID !=id);
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
//End of Task Manager Class



// Accessing the DOM element to append bootsrap card
const taskContainer = document.querySelector("#tskContainer");
// Creating taskAdmin Object
var taskAdmin = new TaskManager(taskContainer);



//Loading Tasks from Storage.
displayTasksFromStorage(); 




// Add task button click event listener. when clicked on 'Add Task' button, the label for the model has to change it back to 'Add Task'
document.querySelector('#btnAddTask').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById("taskModalLabel").innerHTML = "Add Task"
    console.log(document.getElementById("taskModalLabel").innerHTML);
});



document.querySelector('#frmAddTask').addEventListener('submit', (e) => {
    e.preventDefault();
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
}



function deleteTaskClicked(event) {
    //Confirmation before deleting the task
    if (confirm('Are you sure you want to delete the task?')) {
    const taskElement = event.target.closest('.card');
    taskAdmin.deleteTask(taskElement.attributes.id.value);
    } else 
    {
        console.log('Task was not deleted');
    }

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
function displayTasksFromStorage() {
    let taskContainer = document.querySelector("#tskContainer");
    let htmlStr = "";
    let myTasksInStore = JSON.parse(window.localStorage.getItem('mytasks'));
    if (myTasksInStore) {
        for(let i=0; i < myTasksInStore.length; i++){
        htmlStr = `
        <div class="card border-info mt-2">
            <div id ="${myTasksInStore[i].ID}" class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col-md-8">
                            <h5 class="card-title">${myTasksInStore[i].TaskName}</h5>
                        </div>
                        <div class="col-md-4">
                            <h5 class="dueDateLabel">Due Date: ${myTasksInStore[i].DueDate}</h5>                        
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <label for="forTaskDescription">
                        <dt>Description</dt>
                    </label>
                    <div class="overflow-auto border">
                        <p class="card-text">${myTasksInStore[i].TaskDesc}</p>
                    </div>
                    <div class="row mt-5">
                        <div class="col-md-6 border">
                            <label for="forAssignedTo">
                                <dt>Assigned To</dt>
                            </label>
                            <p>${myTasksInStore[i].AssignedTo}</p>
                        </div>
                        <div class="col-md-6 border">
                            <label for="selectStatus">
                                <dt>Status</dt>
                            </label>
                            <p>${myTasksInStore[i].Status}</p>
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

}