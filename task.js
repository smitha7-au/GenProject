export default class Task {
    constructor(ID, name, desc, date, assignedTo, status) {
        this.ID = ID;
        this.TaskName = name;
        this.TaskDesc = desc;
        this.DueDate = date;
        this.AssignedTo = assignedTo;
        this.Status = status;
    }
}