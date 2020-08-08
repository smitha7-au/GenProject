class Task {
    constructor(id, name, description, 
        assignedTo, dueDate, status) {
            this.id = id;
            this.name = name
            this.description = description;
            this.assignedTo = assignedTo;
            this.dueDate = dueDate;
            this.status = status;
        }

        toHtmlElement() {
            const html = `<div>
            <div class="card border-info mt-5">
            <div class="card-header">
                <div class="row">
                    <div class="col-md-8">
                        <h5 class="card-title">${this.name}</h5>
                    </div>
                    <div class="col-md-4">
                        <h5 class="dueDateLabel">Due Date: ${this.dueDate}
                    </div>
                </div>
            </div>

            <div class="card-body">
                <label for="forTaskDescription">
                    <dt>Description</dt>
                </label>
                <div class="overflow-auto border">
                    <p class="card-text">${this.description}</p>
                </div>
                <div class="row mt-5">
                    <div class="col-md-6 border">
                        <label for="forAssignedTo">
                            <dt>Assigned To</dt>
                        </label>
                        <p>${this.assignedTo}</p>
                    </div>
                    <div class="col-md-6 border">
                        <label for="selectStatus">
                            <dt>Status</dt>
                        </label>
                        <p>${this.status}</p>
                    </div>

                </div>
            </div>
            <ul class="nav nav-tabs ml-auto">
            <li class="nav-item">
                <button type="button" class="btn btn-primary">Update</button>
            </li>
            <li class="nav-item ">
                <button type="button" action ="delete" class="btn btn-primary delete-task">Delete</button>
            </li>
        </ul>
            </div>`;
        
            const element = document.createRange().createContextualFragment(html);
            return element;
        }
    }

class TaskManager {
    constructor(tasksContainer) {
        this.tasks =[];
        this.currentId = 0;
        this.tasksContainer = tasksContainer;
    }


    add(task) {
        this.tasks.push(task);
        this.display();

    }

    display() {
        this.tasksContainer.innerHTML = "";
        this.tasks.forEach(task => {
            this.tasksContainer.append(task.toHtmlElement());
        });
    }

    clearFields() {
        document.querySelector('#forInputTask').value = '';
        document.querySelector('#forTaskDescription').value = '';
        document.querySelector('#forAssignedTo').value = '';
        document.querySelector('#inputDate').value = '';
        document.querySelector('#selectStatus').value = '';
    }

    delete() {
        this.tasks.splice((this.currentId-1), 1);
        this.display();
    
    }
}



document.querySelector('#task-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    let validMsg = document.getElementById('validMessage');
    const taskName = document.querySelector('#forInputTask').value;
    const taskDescription = document.querySelector('#forTaskDescription').value;
    const taskDueDate = document.querySelector('#inputDate').value;
    const taskAssignedTo = document.querySelector('#forAssignedTo').value;
    const taskStatus = document.querySelector('#selectStatus').value;
    

     if (taskName == "" || taskDescription == "" || taskDueDate == "" || taskAssignedTo == "")
        {
            validMsg.innerHTML = "Please fill all the required fields.";
        
        }
        else if (taskName.length < 8)
        { 
            validMsg.innerHTML = "Task name is too short";
            console.log("name is short");
        }
        else if (taskDescription.length < 15) 
        {
            validMsg.innerHTML = "Task Description is too short";
        }
        else if (taskAssignedTo.length < 8)
        {
            validMsg.innerHTML = "Assigned to name is too short";
        }
        else
        {
            const task = new Task(taskManager.currentId++, taskName, taskDescription, 
                taskAssignedTo, taskDueDate, taskStatus);
                taskManager.add(task);
            validMsg.innerHTML = "Task Submitted Successfully!"
            taskManager.clearFields();
        
        };
       
});

const tasksContainer = document.querySelector("#tasklist");
const taskManager = new TaskManager(tasksContainer);


document.addEventListener("click", (event) => {
    const element = event.target;
    // console.log(element);
    if(element.attributes.action) {
        const elementAction = element.attributes.action.value;
        if(elementAction =="delete") {
            taskManager.delete(element);
        }
    }
});



// Static Inputs
// const task1 = new Task('9422a1', 'Task1', 'Creating Wireframes', 
// //             'Jane', '05/08/2020', 'Done');
// const task2 = new Task('9422a2', 'Task2', 'Creating Classes', 
// 'Robin', '25/08/2020', 'In Progress');
// taskManager.add(task1);
// taskManager.add(task2);
