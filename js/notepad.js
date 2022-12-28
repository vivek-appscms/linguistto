// grabbing element and global variables declaration
let noteTitle = document.getElementById("note-title");
let content = document.getElementById("content_text");
let saveBtn = document.getElementById("btn-submit");
let data = document.querySelector(".savedData");

let editorType = document.querySelector("#select-editor");

let tasks = document.querySelector(".task-item");
let selectedDropDown = document.querySelector(".dropdown");
let importLbl = document.querySelector(".import-label");
let selectedVal;

//displaying  selected editor
function displayEditor() {
  let selectedEditor = document.querySelector(".selected-editor").textContent;

  if (selectedEditor == "Plain Text Note") {
    selectedVal = 0;
  } else if (selectedEditor == "Rich Text Note") {
    selectedVal = 1;
  } else if (selectedEditor == "Task List") {
    selectedVal = 2;
  }
  if (selectedVal == 0) {
    content.style.display = "block";
    document.querySelector("#taskList").style.display = "none";
    if (CKEDITOR.instances["content_text"] != null) {
      CKEDITOR.instances["content_text"].destroy();
    }
  } else if (selectedVal == 1) {
    content.style.display = "block";
    displayRichText();
    // content.style.display = "none";
    document.querySelector("#taskList").style.display = "none";
  } else if (selectedVal == 2) {
    if (CKEDITOR.instances["content_text"] != null) {
      CKEDITOR.instances["content_text"].destroy();
    }
    content.style.display = "none";
    document.querySelector("#taskList").style.display = "block";
  }
}
// creating drop down menu for import/ editor select
function dropdown() {
  var content = document.querySelector(".dropdown-content");
  var display = content.style.display;

  if (display == "flex") {
    content.style.display = "none";
  } else {
    content.style.display = "flex";
  }
}

//saving notes in local storage
function saveNote() {
  var title_val = noteTitle.value;
  if (selectedVal == 2) {
    if (title_val == "") {
      title_val = getCurrentTime();
    }
    title_val = title_val + "-AppscmsNotepad-tasks#";
    content_val = tasks.innerHTML;
  } else {
    if (title_val == "") {
      title_val = getCurrentTime();
    }

    title_val = title_val + "-AppscmsNotepad";
    var content_val = content.value;

    if (selectedVal == 1) {
      var data = CKEDITOR.instances.content_text.document.getBody().getText();
      content_val = data;
    }
  }

  localStorage.setItem(title_val, content_val);
  var savedData = allStorage();
  displaySavedData(savedData);

  var btns = document.querySelectorAll(".dataBtn");
  for (i of btns) {
    i.addEventListener("click", getData);
  }
  event.preventDefault();
}

//listener on save button
saveBtn.addEventListener("click", saveNote);

// fetching all saved data from local storage.
function allStorage() {
  keys = Object.keys(localStorage);
  keys = keys.filter((e) => {
    return e.includes("-AppscmsNotepad") == true;
  });

  keys = keys.map((e) => {
    return e.replace("-AppscmsNotepad", "");
  });
  // keys = keys.map((e) => {
  //   return e.replace("-tasks#", "");
  // });

  return keys;
}

// returns cuurent time using this time for naming unnamed notes
function getCurrentTime() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  return datetime;
}

// displaying saved data to the user this method is called everytime after pageLoad
function displaySavedData(keys) {
  var list = document.querySelector(".keyList");
  list.innerHTML = "";
  keys.forEach(function (key_val, index) {
    var html = `<li class="dataBtn">
      <a href="#" class="notepad-img data-key">
      <img src="/assets/notepad.png" alt=""></a>
      <a href="#" class="key data-key">${key_val}</a>     
      <a href="Javascript:void(0)" onclick="editDropDown(event)" class="icon" name=${key_val}>
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i></a>
      <div class="edit-dropDown"  style="display: none;">
      <div class="content-edit" name="">
        <a href="Javascript:void(0)" onclick="getData(event)">Edit</a>
        <a href="Javascript:void(0)" onclick="removeNote(event)">Delete</a>
    </div>
    </div>
    </li>`;
    list.insertAdjacentHTML("beforeend", html);
  });
}

//drop down for edit menu of files
function editDropDown(e) {
  var content = e.target.parentElement.nextElementSibling;
  var display = content.style.display;

  var keyName = e.target.parentElement.getAttribute("name");
  var opendd = document.querySelector(".open-dd");

  if (display == "flex") {
    content.style.display = "none";
    content.classList.remove("open-dd");
  } else if (display == "none" && opendd != null) {
    var ele = document.querySelector(".open-dd");
    ele.style.display = "none";
    ele.classList.remove("open-dd");
    content.style.display = "flex";
    content.setAttribute("name", keyName);
    content.classList.add("open-dd");
  } else {
    content.style.display = "flex";
    content.setAttribute("name", keyName);
    content.classList.add("open-dd");
  }
}

// displaying ck editor
function displayRichText() {
  CKEDITOR.replace("plain-text");
}

// add new text for task list
function fnTaskTextNewFocus(e) {
  e.style.borderBottom = "1px solid black";

  if (e.innerHTML == "Add New Task Here") {
    e.innerHTML = "";
  }
}

// Adding new text box by appending html
function fnTaskNewClicked(e) {
  var taskItem = document.querySelector(".task-item");
  var sibling = e.previousElementSibling;
  sibling.style.color = "black";
  e.style.display = "none";
  e.nextElementSibling.style.display = "inline-block";

  var html = ` <div class=d-flex><input type=checkbox class=task-checkbox onclick="addClassChecked(this)">
  <span
    class=task-text
    contenteditable=true
    onfocus=fnTaskTextNewFocus(this);
    onblur=fnTaskTextNewBlur(this);
    onkeydown=fnTaskTextNewKeyDown(event, this);
    >Add New Task Here</span>
  <span class=task-save onclick=fnTaskNewClicked(this)>
    <i class= "fas fa-check" style="color: black"></i>
  </span>
  <span class=task-delete onclick=fnTaskDelete(this); style= "display: none">
  <i class="fas fa-trash" style="color: black"></i>
  </span>
  </div>`;
  taskItem.insertAdjacentHTML("beforeend", html);
}

// deleting task on click of delete icon
function fnTaskDelete(e) {
  var sibling = e.previousElementSibling;
  var textBox = sibling.previousElementSibling;
  var chekBox = sibling.previousElementSibling.previousElementSibling;
  e.remove();
  textBox.remove();
  chekBox.remove();
  sibling.remove();
}

// for adding check class to the boxes checked
function addClassChecked(e) {
  if (e.checked == true) {
    e.classList.add("checked");
  } else {
    e.classList.remove("checked");
  }
}

// init function is called every after page loads
function init() {
  var savedData = allStorage();
  document.querySelector("#taskList").style.display = "none";
  if (savedData != null) {
    displaySavedData(savedData);
  }
}

init();

// listeners on displayed saved data icons on clicking any of that its content will open in the editor
var btns = document.querySelectorAll(".data-key");
function getData(e) {
  let selectedEditor = document.querySelector(".selected-editor").textContent;
  var key = e.target.textContent;
  displayEditor();
  if (key.includes("-tasks#") && selectedEditor != "Task Text Note") {
    selectTextEditor(2);
  } else if (key == "") {
    key = e.target.parentElement.nextElementSibling.textContent;
  } else if (key == "Edit") {
    key = e.target.parentElement.parentElement.getAttribute("name");
    if (key.includes("-tasks#")) {
      selectTextEditor(2);
    }
  }
  if (selectedVal == 0) {
    var content_val = localStorage.getItem(key + "-AppscmsNotepad");
    content.value = content_val;

    if (selectedVal == 1) {
      CKEDITOR.instances.content_text.setData(content_val);
    }
  } else if (selectedVal == 2) {
    var actualKey = key.replace("-tasks#", "");
    var content_val = localStorage.getItem(
      actualKey + "-AppscmsNotepad-tasks#"
    );
    tasks.innerHTML = content_val;

    var checkBoxes = document.querySelectorAll(".task-checkbox");

    checkBoxes.forEach(function (boxes) {
      if (boxes.classList.contains("checked")) {
        boxes.checked = true;
      }
    });
  }
  var opendd = document.querySelector(".open-dd");
  if (opendd != null) {
    opendd.style.display = "none";
  }
  noteTitle.value = key;
  noteTitle.focus();
}

for (i of btns) {
  i.addEventListener("click", getData);
}

// clear data from local storage not supported from ui
function clearData() {
  localStorage.clear();
  var savedData = allStorage();
  displaySavedData(savedData);
}

//selecting text editor on user input adn displaying the text editor by calling display editor
function selectTextEditor(value) {
  var editor = document.querySelector(".selected-editor");

  if (value == 0) {
    editor.textContent = "Plain Text Note";
  } else if (value == 1) {
    editor.textContent = "Rich Text Note";
  } else if (value == 2) {
    editor.textContent = "Task List";
  }
  displayEditor();
  document.querySelector(".dropdown-content").style.display = "none";
}

// reading text file and open it in editor
async function readFile(e) {
  var fileReader = new FileReader();
  var input_file = document.getElementById("myfile");
  let path = input_file.value;
  var fileType = path.substring(path.lastIndexOf("."));

  if (fileType == ".txt") {
    fileReader.onload = function () {
      content.textContent = fileReader.result;
    };
    fileReader.readAsText(e.files[0]);
  } else {
    const response = await fetch(`http://127.0.0.1:9000/readFiles`);
    const data = await response.json();
    content.textContent = data;
  }
}

// remove saved notes
function removeNote(e) {
  var keyName = e.target.parentElement.parentElement.getAttribute("name");
  var keys = [];
  if (!keyName.includes("-tasks#")) {
    localStorage.removeItem(keyName + "-AppscmsNotepad");
    keys = allStorage();
    displaySavedData(keys);
  } else {
    var actualKey = keyName.replace("-tasks#", "");
    localStorage.removeItem(actualKey + "-AppscmsNotepad-tasks#");
    keys = allStorage();
    displaySavedData(keys);
  }
}
