import { getItems, createItem, deleteItem, updateItem, filterItems } from "./api.js";
import { renderItems } from "./ui.js";

let editingId = null;

async function load() {
    const items = await getItems();
    renderItems(items, {
        onDelete: handleDelete,
        onEdit: startEdit
    });
}

async function handleDelete(id) {
    await deleteItem(id);
    load();
}

function startEdit(item) {
    const form = document.getElementById("form");

    form.title.value = item.title;
    form.description.value = item.description;

    editingId = item._id;
    form.querySelector("button").textContent = "Update";
}

document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();

    const data = {
        title: e.target.title.value,
        description: e.target.description.value
    };

    if (editingId) {
        await updateItem(editingId, data);
        editingId = null;
        e.target.querySelector("button").textContent = "Add";
    } else {
        await createItem(data);
    }

    e.target.reset();
    load();
});

document.getElementById("filterForm").addEventListener("submit", async e => {
    e.preventDefault();

    const title = e.target.title.value;

    const items = await filterItems({
        title,
        fields: ["title", "description"]
    });

    renderItems(items, {
        onDelete: handleDelete,
        onEdit: startEdit
    });
});

load();