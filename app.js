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
    constructor(id, name, description, assignedTo, date, status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.assignedTo = assignedTo;
        this.date = date;
        this.status = status;
    }
}
class TaskManager {
    constructor() {
        this.currentId = 1;
        this.tasks = [];
    }
    getAllTasks() {
        return this.tasks;
    }
    getTasksByStatus() { }
    addTask(name, description, assignedTo, dueDate, status) {
        const task = new Task(
            `task${this.currentId++}`,
            name,
            description,
            assignedTo,
            dueDate,
            status
        );
        //push new task onto the tasks array
        this.tasks.push(task);
    }
    deleteTask(id) { }
    updateTask(id) { }
    assignTask(task) { }
}
