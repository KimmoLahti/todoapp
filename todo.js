//constants for element ID:s

const form = document.getElementById("form");
const text = document.getElementById("text");
const add = document.getElementById("add");
const tasks = document.getElementById("tasks");


// use readsave function after page loaded
onload = readsave;



// check storage for saved content
function readsave(){
    if(localStorage.getItem("tasks") != null){
        document.getElementById("tasks").innerHTML = localStorage.getItem("tasks");
    }
}




//listener to read if user is pressing add button
form.addEventListener("submit", (y) =>{
    // prevent default behavior to reload page
    y.preventDefault();
   
//check if textarea is empty or shorted than 2, alert message and turn textarea borders red if not.
    const tasktext = text.value;
    let color = document.forms.form.text;

    	if((tasktext == null || tasktext == "") || (tasktext.length < 2)){

    alert("Please write a task");
    color.style.borderColor = "red";
   
    
}
else {
//create div element and class when form is added
    const taskdiv = document.createElement("div");
    taskdiv.classList.add("task");
//create li element and class when form is added, also add input to li
    const taskli = document.createElement("li");
    taskli.innerText = tasktext;
    taskli.classList.add("taskitem");
//add li input to div
    taskdiv.appendChild(taskli);
// create delete button. add button to taskdiv. 
    
    const deleteb = document.createElement("button");
    deleteb.innerText = "X";
    deleteb.classList.add("deletebutton");

    save();

    taskdiv.appendChild(deleteb);

//listener to see when user is clicking task, then task toggles css done=line-through and opacity 0.5 to task
    taskdiv.addEventListener("click", () =>{
        taskdiv.classList.toggle("done");
        save();
   });

    //add taskdiv to ul class tasks
    tasks.appendChild(taskdiv);


    //Text area cleared and text area border color back to none.
    text.value = "";
    color.style.borderColor = "";
    save();
}


});
// listener to see if user is pressing delete button.
tasks.addEventListener("click", (x) =>{
    const item = x.target;
    if(item.classList[0] === "deletebutton"){
        //remove task
        const task = item.parentElement;
        task.remove();
        save();
    }
  
});
// save new content, check for done class and remove content from local storage
function save(){
    const tasksdiv = document.querySelectorAll("li");
    const tasks = [];

    tasksdiv.forEach((taskdiv)=>{
        tasks.push({
            text: taskdiv.innerText,
            completed: taskdiv.classList.contains("done"),
        });
    });
    localStorage.setItem("tasks", tasks);
};
