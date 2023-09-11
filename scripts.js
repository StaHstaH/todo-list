let items = new Array();

if (localStorage.getItem("savedItems")) {
    const savedItems = localStorage.getItem("savedItems");
    // console.log(savedItems + " To jest to");
    items = JSON.parse(savedItems);
    displayItems();
}

function saveItems() {
    let savedStrings = JSON.stringify(items);
    localStorage.setItem("savedItems", savedStrings);
}

function createItem() {
    let textArea = document.getElementById('todo_input');
    let priority = document.getElementById('priority');
    let item = {
        itemName: textArea.value,
        itemState: false,
        itemPriority: priority.value
    };
    items.push(item);
    displayItems();

    saveItems();
}

function displayItems() {
    let container = document.getElementById('submitted_tasks');
    container.innerHTML = '';
    items.sort(compareItems);
        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            const para = displaySingle(element, i);
            container.appendChild(para);
        }
    updateTaskNumber();
}

function displaySingle(element, i) {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("onclick", "checkBoxChange("+i+")");
    const para = document.createElement("p");
    para.appendChild(checkbox);
        if(element.itemState === true) {
            para.setAttribute("class", "checked_item");
            checkbox.checked = true;
        }
    let newElement = document.createTextNode(element.itemName);
    para.appendChild(newElement);
    const priority = document.createElement("span");
    para.appendChild(priority);
    let newPriority = document.createTextNode(priorityToText(element.itemPriority));
    priority.appendChild(newPriority);
    priority.setAttribute("class", "priority_level_" +element.itemPriority);
    return para;
            
}

function priorityToText(priority) {
    const n = parseInt(priority);
    let result = "";
    for (let i = 0; i < n; i++) {
            result = result + " !";
        }
    return result;
}

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
    displayItems();
    saveItems();
}

