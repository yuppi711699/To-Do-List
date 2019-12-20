'use strict';
function checkShowTask(){
  if (localStorage.getItem('tasks') === null || localStorage.getItem('tasks').length === 2){
    let tasks = [
        {
            "task" : 'do home work',
            "status": 'open',
            "priority": 'low'
        },
        {
          "task" : 'do home work1',
          "status": 'open', 
          "priority": 'low'
      }
    ];
    JSONstring(tasks);
  }
}
let JSONstring = (tasks) => localStorage.setItem("tasks", JSON.stringify(tasks));
let JSONparse = () => JSON.parse(localStorage.getItem("tasks"));

function showTasks(){
  let taskMainElement = document.getElementById('wrapper');
  const taskStorage = JSONparse();
  addNewTask();
  for(let i = 0; i < taskStorage.length; i++){
    let taskRow = document.createElement('div');
    taskRow.className = "task";
    taskRow.className = "status";
    taskRow.innerHTML = '<span id="' + i + '"> (status: ' + taskStorage[i].status 
                        + ', priority: ' + taskStorage[i].priority 
                        + ') ' + taskStorage[i].task + '</span>' +
    '<input type="button" class="remove" value="Remove">' +
    '<input type="button" class="edit" value="edit">' +
    '<input type="button" class="priority" value="Change priority">' +
    '<input type="button" class="status" value="Change status">' +
    '';
    taskRow.setAttribute('data-taskId', i);
    taskRow.getElementsByClassName('remove')[0].addEventListener('click', removeTask);
    taskRow.getElementsByClassName('edit')[0].addEventListener('click', editTask);
    taskRow.getElementsByClassName('priority')[0].addEventListener('click', changePrioprity);
    taskRow.getElementsByClassName('status')[0].addEventListener('click', changeStatus);
    taskMainElement.append(taskRow);
  }
}

function changeStatus(e){
  const taskId = e.target.parentElement.dataset.taskid;
  const taskStorage = JSONparse();
  if (taskStorage[taskId].status === "open"){
    taskStorage[taskId].status = "In progress";
  } else if (taskStorage[taskId].status === "In progress"){
    taskStorage[taskId].status = "Done";
  } else {
    taskStorage[taskId].status = "open";
  }
  JSONstring(taskStorage);
  visibleOfChange();
}
function  changePrioprity(e){
  const taskId = e.target.parentElement.dataset.taskid;
  const taskStorage = JSONparse();
  if (taskStorage[taskId].priority === "low"){
    taskStorage[taskId].priority = "Minor";
  } else if (taskStorage[taskId].priority === "Minor"){
    taskStorage[taskId].priority = "Major";
  } else if (taskStorage[taskId].priority === "Major"){
    taskStorage[taskId].priority = "High";
  } else {
    taskStorage[taskId].priority = "low";
  }
  JSONstring(taskStorage);
  visibleOfChange();
}
function addNewTask(){
  let taskMainElement = document.getElementById('wrapper');
  const taskStorage = JSONparse();
  let taskRow = document.createElement('div');
    taskRow.className = "task";
    taskRow.innerHTML = '<input type="text" id="newTaskValue">' +
    '<input type="button" class="newTask" value="New Task">' +
    '';
    taskRow.getElementsByClassName("newTask")[0].addEventListener('click', newTask);
    taskMainElement.append(taskRow);
}

function editTask(e){
  let taskMainElement = document.getElementById('wrapper');
  const taskStorage = JSONparse();
  const taskId = e.target.parentElement.dataset.taskid;
  let taskRow = document.createElement('div');
  taskRow.className = "task";
    taskRow.innerHTML = '<input type="text" id="newTaskEditValue" value="' 
    + taskStorage[taskId].task + '">' +
    '<input type="button" class="newTaskEdit" value="Edit">' +
    '';
    taskRow.getElementsByClassName("newTaskEdit")[0].addEventListener('click', newTaskEdit);
    taskMainElement.append(taskRow);
    function newTaskEdit(){
      const taskId = e.target.parentElement.dataset.taskid;
      const taskStorage = JSONparse();
      let newTask = document.getElementById('newTaskEditValue').value
      taskStorage[taskId].task = newTask;
      JSONstring(taskStorage);
      visibleOfChange();
    }
}
function newTask(){
  let newTask = document.getElementById('newTaskValue').value;
  let newTaskStorage = JSONparse();
  newTaskStorage.push({
    "task": newTask,
    "status": 'open',
    "priority": 'low'
  })
  JSONstring(newTaskStorage);
  visibleOfChange();
}
function removeTask(e){
  const taskId = e.target.parentElement.dataset.taskid;
  const taskStorage = JSONparse();
  taskStorage.splice(taskId, 1);
  JSONstring(taskStorage);
  visibleOfChange();
}
function visibleOfChange(){
  document.body.innerHTML = '<div id="wrapper"> </div>' +
                            '<div id="info">';
  checkShowTask();
  showTasks();
}