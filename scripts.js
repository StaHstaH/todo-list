let items = new Array();

function createItem() {
    let textArea = document.getElementById('todo_input');
    let item = {
        itemName: textArea.value
    };
    items.push(item);
    displayItems();
}

function displayItems() {
    let container = document.getElementById('submitted_tasks');
    container.innerHTML = '';
        for (const element of items) {
            const para = document.createElement("p");
            let newElement = document.createTextNode(element.itemName);
            para.appendChild(newElement);
            container.appendChild(para);
        }
}

