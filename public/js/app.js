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

    Object.keys(form.elements).forEach(name => {
        if (item[name]) {
            form[name].value = item[name];
        }
    });

    editingId = item._id;
    form.querySelector("button").textContent = "Update";
}

document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    let res;
    if (editingId) {
        res = await updateItem(editingId, data);
        editingId = null;
        e.target.querySelector("button").textContent = "Add";
    } else {
        res = await createItem(data);
    }

    if (!res.ok) {
        const err = await res.json();
        alert(err.error);
        return;
    }

    e.target.reset();
    load();
});

document.getElementById("filterForm").addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const fields = formData.getAll("fields");

    const params = {
        day: formData.get("day"),
        sortBy: formData.get("sortBy"),
        order: formData.get("order"),
        fields: fields.join(",")
    };

    const items = await getItems(params);

    renderItems(items, {
        onDelete: handleDelete,
        onEdit: startEdit
    });
});

load();