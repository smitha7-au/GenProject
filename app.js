// Declare global variables
var TaskName, TaskDesc, DueDate, AssignedTo, Status;

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
    // assigning the input values in to the domain variables.
    TaskName = document.getElementById('txtTaskName').value;
    TaskDesc = document.getElementById('txtTaskDec').value;
    DueDate = document.getElementById('duedate').value;
    AssignedTo = document.getElementById('txtTaskAssigned').value;
    Status = document.getElementById('selectStatus').value;

    // Create an object of a task now and pass the input values 
    var NewTask = new Task(100, TaskName, TaskDesc, DueDate, AssignedTo, status);
    NewTask.addTask();
    // NewTask.getAllTasks();
    // NewTask.deleteTask();
}

// java script task class object
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
        alert("All Tasks");
    }

    getTasksWithStatus(status) {
        alert("All Tasks by the status");
    }
    addTask(Task) {
        alert("New task added with the below values \n" + "Task name :" + TaskName + "\nTask Description:" + TaskDesc + "\nDue Date:" + DueDate + "\nAssigned To:" + AssignedTo + "\nStatus:" + Status);
        document.getElementById("Output").innerHTML = "New task added with the below values \n" + "Task name :" + TaskName + "\nTask Description:" + TaskDesc + "\nDue Date:" + DueDate + "\nAssigned To:" + AssignedTo + "\nStatus:" + Status;
    }

    deleteTask(Task) {
        alert("delete task added");
    }

    updateTask(taskId, status) {
        alert("Update task added");
    }

    assignTask(taskId, assignee) {
        alert("Assign task added");
    }

    greeting() {
        alert('New Task added successfully.');
    };

}