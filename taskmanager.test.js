import TaskManager from "./taskmanager";

let taskAdmin, taskContainer;

beforeEach(() => {
    document.body.innerHTML = `
        <div id="tskContainer">
            <!-- Cards get added dynamically here -->
        </div>`;
    localStorage.clear();

    taskContainer = document.querySelector("#tskContainer");
    taskAdmin = new TaskManager(taskContainer);

    // adding 4 tasks globally
    expect(taskAdmin.tasks.length).toBe(0);
    let task10 = taskAdmin.addTask("name10", "desc", "duedate", "assignto", "status");
    let task11 = taskAdmin.addTask("name11", "desc", "duedate2", "assignto2", "status2");
    let task12 = taskAdmin.addTask("name12", "desc", "duedate3", "assignto3", "status3");
    let task13 = taskAdmin.addTask("name13", "desc", "duedate3", "assignto3", "status3");
    expect(taskAdmin.tasks.length).toBe(4);
});

test("Unit testing for Add method ", () => {
    //expect(taskAdmin.tasks.length).toBe(0);
    //Adding 3 tasks now
    let task4 = taskAdmin.addTask("name4", "desc", "duedate", "assignto", "status");
    expect(taskAdmin.tasks.length).toBe(5);
    let task5 = taskAdmin.addTask("name5", "desc2", "duedate2", "assignto2", "status2");
    expect(taskAdmin.tasks.length).toBe(6);
    let task6 = taskAdmin.addTask("name6", "desc3", "duedate3", "assignto3", "status3");
    expect(taskAdmin.tasks.length).toBe(7);
});

test("Unit testing for Edit method ", () => {
    //Adding 3 tasks now
    let task7 = taskAdmin.addTask("name4", "desc", "duedate", "assignto", "status");
    let task8 = taskAdmin.addTask("name5", "desc2", "duedate2", "assignto2", "status2");
    let task9 = taskAdmin.addTask("name6", "desc3", "duedate3", "assignto3", "status3");

    // total length of array is 3 now
    expect(taskAdmin.tasks.length).toBe(7);
    // Modify task name from "name5" to "name80" by calling edit method
    taskAdmin.editTask(task8.ID, "name80", "desc30", "duedate30", "assignto3", "status3");
    // task name of task8 should be "name80" now 
    expect(task8.TaskName).toBe("name80");
});

test("Unit testing for Delete method ", () => {
    //Adding 3 tasks now
    let task7 = taskAdmin.addTask("name4", "desc", "duedate", "assignto", "status");
    let task8 = taskAdmin.addTask("name5", "desc2", "duedate2", "assignto2", "status2");
    let task9 = taskAdmin.addTask("name6", "desc3", "duedate3", "assignto3", "status3");

    // total length of array is 3 now
    expect(taskAdmin.tasks.length).toBe(7);

    // now delete one record from the array
    taskAdmin.deleteTask(task7.ID);

    // now the length of array is 2 after deletion
    expect(taskAdmin.tasks.length).toBe(6);
});




/*
test("Performing unt testing for Add, Delete and Edit methods in TaskManager class", () => {
    expect(taskAdmin.tasks.length).toBe(0);
    expect(taskContainer.children.length).toBe(0);

    //Adding 1st task
    let task1 = taskAdmin.addTask("name1", "desc", "duedate", "assignto", "status");
    let task2 = taskAdmin.addTask("name2", "desc2", "duedate2", "assignto2", "status2");
    let task3 = taskAdmin.addTask("name3", "desc3", "duedate3", "assignto3", "status3");

    expect(taskAdmin.tasks.length).toBe(3);
    //expect(taskContainer.children.length).toBe(1);

    taskAdmin.deleteTask(task2.ID);
    expect(taskAdmin.tasks.length).toBe(2);

    taskAdmin.editTask(task1.ID, "name30", "desc30", "duedate30", "assignto3", "status3");
    expect(task1.TaskName).toBe("name30");
    // expect(JSON.parse(localStorage.getItem('mytasks')).ID).toBe("task1");
});
*/