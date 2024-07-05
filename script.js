document.addEventListener("DOMContentLoaded", () => {
    fetchItems();
});

async function fetchItems() {
    try {
        const response = await fetch('http://localhost:3000/api/items');
        const items = await response.json();
        const itemList = document.getElementById('itemList');
        itemList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} (Quantity: ${item.quantity})`;
            li.id = item._id;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteItem(item._id);
            li.appendChild(deleteButton);
            itemList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

async function addItem() {
    const newItemInput = document.getElementById('newItem');
    const newItemName = newItemInput.value.trim();
    if (newItemName === '') {
        alert('Item name cannot be empty');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newItemName, quantity: 1 }) // Default quantity is 1
        });
        if (response.ok) {
            newItemInput.value = '';
            fetchItems();
        } else {
            console.error('Error adding item:', response.statusText);
        }
    } catch (error) {
        console.error('Error adding item:', error);
    }
}

async function deleteItem(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/items/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchItems();
        } else {
            console.error('Error deleting item:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}
