import Task from "./task.js"

const addTask = new Task("task1", "gardening", "water the plants", "29/8/2020", "John", "In progress");

test("Object Creation", () => {
    expect(addTask.ID).toBe("task1");
    expect(addTask.TaskName).toBe("gardening");
    expect(addTask.TaskDesc).toBe("water the plants");
    expect(addTask.DueDate).toBe("29/8/2020");
    expect(addTask.AssignedTo).toBe("John");
    expect(addTask.Status).toBe("In progress");
});