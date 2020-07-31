function validate(){
    let validMsg = document.getElementById('validMessage');
    let tName = document.getElementById('forInputTask').value;
    let tDesc = document.getElementById('forTaskDescription').value;
    let dDate = document.getElementById('inputDate').value;
    let assignedTo = document.getElementById('forAssignedTo').value;
    let button = document.getElementById('btnClick');
    

     if (tName == "" || tDesc == "" || dDate == "" || assignedTo == "")
        {
            validMsg.innerHTML = "Please fill all the required fields.";
        
        }
        else if (tName.length < 8)
        { 
            validMsg.innerHTML = "Task name is too short";
            console.log("name is short");
        }
        else if (tDesc.length < 15) 
        {
            validMsg.innerHTML = "Task Description is too short";
        }
        else if (assignedTo.length < 8)
        {
            validMsg.innerHTML = "Assigned to name is too short";
        }
        else
        {
            validMsg.innerHTML = "Task Submitted Successfully!"
        }
        

}
