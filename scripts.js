let items = new Array();
let checkedItems = new Array();

if (localStorage.getItem("savedItems")) {
    const savedItems = localStorage.getItem("savedItems");
    items = JSON.parse(savedItems);

}

if (localStorage.getItem("savedCheckedItems")) {
    const savedItems = localStorage.getItem("savedCheckedItems");
    checkedItems = JSON.parse(savedItems);
}

displayItems();
validateInput();

function saveItems() {
    let itemsString = JSON.stringify(items);
    let checkedItemsString = JSON.stringify(checkedItems);
    localStorage.setItem("savedItems", itemsString);
    localStorage.setItem("savedCheckedItems", checkedItemsString);
}



function displaySingle (element,i,container) {
 let arrayName = element.itemState ? 'checkedItems' : 'items' ;
 let checkbox = document.createElement("input");
 let checkboxId = "checkbox_" +i+ "_" +arrayName;
    checkbox.type = "checkbox";
    checkbox.setAttribute("onclick", "checkBoxChange("+i+ ',' +arrayName+")");
    checkbox.setAttribute("id", checkboxId);
 let itemLabel = document.createElement("label");
    itemLabel.setAttribute("for", checkboxId);
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
    deleteButton.setAttribute("onclick", "deleteItem("+i+ ',' +arrayName+")");
    deleteButton.setAttribute("class", "delete_button");

const currentDate = new Date();
const dueDate = new Date(element.dueDate);  

if(dueDate < currentDate) {
    itemLabel.setAttribute("class", "overdue_task");
}

if(element.itemState === true) {
    itemLabel.setAttribute("class", "checked_item");
    checkbox.checked = true;    
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
    let textInput = document.getElementById('todo_input');
    let dateInput = document.getElementById('date');
    let button = document.getElementById('button');
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateInput.value);

    const textValid = textInput.value === '';
    const dateValid = dueDate < currentDate;
    if(textValid || dateValid) {
        if (textValid) {
            textInput.setAttribute("class", "warning");
        };
        if (dateValid) {
            dateInput.setAttribute("class", "warning");
        }
        button.disabled = true;
    } else {
        button.disabled = false;
        textInput.setAttribute("class", '');
        dateInput.setAttribute("class", '');
    }
}

function deleteItem(i, itemsArray) {
    itemsArray.splice(i, 1);
    displayItems();
    saveItems();
}

function deleteDoneItems() {
    checkedItems = [];
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

    container = document.getElementById('done_tasks');
    container.innerHTML = '';
    checkedItems.sort(compareItems);
        for (let i = 0; i < checkedItems.length; i++) {
            const element = checkedItems[i];
            displaySingle(element, i, container);
        }
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

function checkBoxChange(index, itemsArray) {
    const changedItem = itemsArray[index];
        if(changedItem.itemState === true){
            changedItem.itemState = false;
            itemsArray.splice(index, 1);
            items.push(changedItem);
        } else {
            changedItem.itemState = true;
            itemsArray.splice(index, 1);
            checkedItems.push(changedItem);
        }
        displayItems();
        saveItems();
}

