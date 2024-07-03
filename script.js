let items = JSON.parse(localStorage.getItem('items')) || [];

document.addEventListener('DOMContentLoaded', renderItems);

function addItem() {
    const newItemInput = document.getElementById('newItem');
    const newItemName = newItemInput.value.trim();

    if (newItemName !== '') {
        const newItem = { id: Date.now().toString(), name: newItemName };
        items.push(newItem);
        localStorage.setItem('items', JSON.stringify(items));
        newItemInput.value = '';
        renderItems();
    }
}

function deleteItem(id) {
    items = items.filter(item => item.id !== id);
    localStorage.setItem('items', JSON.stringify(items));
    renderItems();
}

function renderItems() {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = '';

    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(item.id);

        li.appendChild(deleteButton);
        itemList.appendChild(li);
    });
}
