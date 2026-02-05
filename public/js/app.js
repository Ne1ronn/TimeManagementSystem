import {
    getTimeBlock,
    createTimeBlocks,
    deleteTimeBlock,
    updateTimeBlock,
    filterTimeBlocks
} from "./api.js";

import { renderTimeBlocks } from "./ui.js";

let editingId = null;

async function load() {
    const timeBlocks = await getTimeBlock();
    renderTimeBlocks(timeBlocks, {
        onDelete: handleDelete,
        onEdit: startEdit,
        onDetails: openDetails
    });
}

async function handleDelete(id) {
    await deleteTimeBlock(id);
    load();
}

function startEdit(timeBlock) {
    const form = document.getElementById("form");

    Object.keys(form.elements).forEach(name => {
        if (timeBlock[name] !== undefined) {
            form[name].value = timeBlock[name];
        }
    });

    editingId = timeBlock._id;
    form.querySelector("button").textContent = "Update";
}

async function openDetails(id) {
    const res = await fetch(`/api/time-blocks/${id}`);
    if (!res.ok) {
        alert("Not found");
        return;
    }

    const b = await res.json();

    document.getElementById("d-title").textContent = b.title;
    document.getElementById("d-day").textContent = b.day;
    document.getElementById("d-time").textContent = `${b.startTime} – ${b.endTime}`;
    document.getElementById("d-priority").textContent = b.priority;
    document.getElementById("d-desc").textContent = b.description || "—";

    document.getElementById("detailsModal").classList.remove("hidden");
}

document.getElementById("closeModal").onclick = () => {
    document.getElementById("detailsModal").classList.add("hidden");
};

document.getElementById("form").addEventListener("submit", async e => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.target));

    let res;
    if (editingId) {
        res = await updateTimeBlock(editingId, data);
        editingId = null;
        e.target.querySelector("button").textContent = "Add";
    } else {
        res = await createTimeBlocks(data);
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

    const timeBlocks = await filterTimeBlocks(params);

    renderTimeBlocks(timeBlocks, {
        onDelete: handleDelete,
        onEdit: startEdit,
        onDetails: openDetails
    });
});

load();
