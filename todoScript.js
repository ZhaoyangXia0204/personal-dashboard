var addTitleBtn = document.getElementById("addTitleBtn");

if (window.localStorage.getItem("totalToDoItems") === null) {
  window.localStorage.setItem("totalToDoItems", "0");
  alert("just got added");
}

//window.localStorage.removeItem("totalToDoItems");

function addActivityItem() {
  var totalItems = parseInt(window.localStorage.getItem("totalToDoItems"));
  totalItems++;
  window.localStorage.setItem("totalToDoItems", totalItems);
  alert(totalItems);
}

function addDeleteActivity() {
  addTitleBtn.style.backgroundColor = "red";
  addTitleBtn.value = "delete";
  addTitleBtn.style.color = "white";
}


//function addTodoItem() {}
