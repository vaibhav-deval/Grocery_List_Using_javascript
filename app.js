const btnCat = document.querySelector(".btnCat");
const inputCat = document.querySelector(".inputCat");
const list = document.querySelector(".list");

get();
btnCat.addEventListener("click", () => {
  if (inputCat.value === "") {
    alert("Write Category Name");
  } else {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";

    list.append(categoryDiv);

    const catHeadingDiv = document.createElement("div");
    catHeadingDiv.className = "catHeadDiv";

    const taskInputDiv = document.createElement("div");
    taskInputDiv.className = "taskInputDiv";

    const tasklist = document.createElement("ol");
    tasklist.className = "tasklist";

    categoryDiv.append(catHeadingDiv, taskInputDiv, tasklist);

    const catHeading = document.createElement("h2");
    catHeading.className = "catHead";
    catHeading.textContent = inputCat.value;

    const catDel = document.createElement("button");
    catDel.className = "catDel";
    catDel.textContent = "Delete";
    catDel.onclick = () => {
      categoryDiv.classList.add("removed"); // Add fade-out animation
      setTimeout(() => {
        categoryDiv.remove();
        save();
      }, 400); // Wait for transition to complete before removing
    };
    

    catHeadingDiv.append(catHeading, catDel);

    const taskInput = document.createElement("input");
    taskInput.className = "taskInput";
    taskInput.placeholder = "Add Task..............";

    const addTask = document.createElement("button");
    addTask.className = "addTask";
    addTask.textContent = "Add";
    addTask.onclick = () => addTaskFunc(tasklist, taskInput);

    taskInputDiv.append(taskInput, addTask);

    inputCat.value = "";
    inputCat.focus();
    save();
  }
});

function addTaskFunc(tasklist, taskInput) {
  if (taskInput.value === "") {
    alert("Please enter an item");

    return;
  } else {
    const task = document.createElement("li");
    task.className = "task";

    const tasks = document.createElement("span");
    tasks.className = ".tasks";
    tasks.textContent = taskInput.value;
    const taskDel = document.createElement("button");
    taskDel.className = "taskDel";
    taskDel.textContent = "Delete";
    taskDel.onclick = () => {
      task.classList.add("removed"); // Add fade-out animation
      setTimeout(() => {
        task.remove();
        save();
      }, 400); // Wait for transition before removing
    };
    
    taskInput.focus();
    taskInput.value = "";

    task.append(tasks, taskDel);
    tasklist.append(task);
    save();
  }
}

function save() {
  
  localStorage.setItem("data", list.innerHTML);
}
function get() {
  const data = localStorage.getItem("data");
  if (data) {
    list.innerHTML = data;

    // Restore event listeners for delete buttons AFTER setting innerHTML
    document.querySelectorAll(".catDel").forEach((button) => {
      button.onclick = () => {
        button.parentElement.parentElement.remove();
        save(); // Fix: Ensure localStorage updates after deletion
      };
    });

    document.querySelectorAll(".taskDel").forEach((button) => {
      button.onclick = () => {
        button.parentElement.remove();
        save(); // Fix: Ensure localStorage updates after deletion
      };
    });

    document.querySelectorAll(".addTask").forEach((button) => {
      button.onclick = () => {
        const taskInput = button.previousElementSibling;
        const tasklist = button.parentElement.nextElementSibling;
        addTaskFunc(tasklist, taskInput);
      };
    });
  }
}
get();
