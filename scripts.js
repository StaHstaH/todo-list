let items = new Array();

if (localStorage.getItem("savedItems")) {
    const savedItems = localStorage.getItem("savedItems");
    items = JSON.parse(savedItems);
    displayItems();
}

validateInput();

function saveItems() {
    let savedStrings = JSON.stringify(items);
    localStorage.setItem("savedItems", savedStrings);
}

function displaySingle (element,i,container) {
 let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("onclick", "checkBoxChange("+i+")");
    checkbox.setAttribute("id", "checkbox_" +i);
 let itemLabel = document.createElement("label");
    itemLabel.setAttribute("for", "checkbox_" +i);
    itemLabel.setAttribute("class", "priority_level_" +element.itemPriority);

//  let labelText = document.createTextNode("")
 let heading = document.createElement("h2");
 let newHeading = document.createTextNode(element.itemName);
    heading.appendChild(newHeading);
 let span = document.createElement("span");
    itemLabel.appendChild(heading);
    heading.appendChild(span);
 let newElement = document.createTextNode(element.dueDate);
    span.appendChild(newElement);
    container.appendChild(checkbox);
    container.appendChild(itemLabel);

let deleteButton = document.createElement("button");
    span.appendChild(deleteButton);
    deleteButton.setAttribute("onclick", "deleteItem("+i+")");
    deleteButton.setAttribute("class", "delete_button");

if(element.itemState === true) {
    itemLabel.setAttribute("class", "checked_item");
    checkbox.checked = true;    
    }

const currentDate = new Date();
const dueDate = new Date(element.dueDate);  

if(dueDate < currentDate) {
    itemLabel.setAttribute("class", "overdue_task");
}

}

function createItem() {
    let textArea = document.getElementById('todo_input');
    let priority = document.getElementById('priority');
    let dueDate = document.getElementById('date');
    let item = {
        itemName: textArea.value,
        itemState: false,
        itemPriority: priority.value,
        dueDate: dueDate.value,
    };
    items.push(item);
    displayItems();
    saveItems();
}

function validateInput() {
    let input = document.getElementById('todo_input');
    if(input.value === '') {
        input.setAttribute("class", "warning");
        let button = document.getElementById('button');
        button.disabled = true;
    } else {
        button.disabled = false;
        input.setAttribute("class", '');
    }
}

function deleteItem(i) {
    items.splice(i, 1);
    displayItems();
    saveItems();
}


function displayItems() {
    let container = document.getElementById('submitted_tasks');
    container.innerHTML = '';
    items.sort(compareItems);
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            displaySingle(element, i, container);
        }
    updateTaskNumber();
}

function priorityToText(priority) {
    const n = parseInt(priority);
    let result = "";
    for (let i = 0; i < n; i++) {
            result = result + " !";
        }
    return result;
}




// function that compares the items according to their priority, which allows the code to sort them
function compareItems(item1, item2) {
    let priority1 = parseInt(item1.itemPriority);
    let priority2 = parseInt(item2.itemPriority);

    if (priority1 < priority2) {
        return 1;
    } else if (priority1 > priority2) {
        return -1;
    } else {
        return 0;
    }
}

function updateTaskNumber() {
    let taskNumber = 0;
    for(let i = 0; i < items.length; i++) {
        const element = items[i];
        if (element.itemState == false) {
             taskNumber = taskNumber + 1;
        }
        
    }
    let span = document.getElementById('item_number');
        span.innerHTML = taskNumber;
}

function checkBoxChange(index) {
    const changedItem = items[index];
        if(changedItem.itemState === true){
            changedItem.itemState = false;
        } else {
            changedItem.itemState = true;
        }
    // items.splice(index, 1);
        displayItems();
        saveItems();
}

