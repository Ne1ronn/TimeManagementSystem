const BASE = "/api/items";

export async function getItems() {
    return fetch(BASE).then(r => r.json());
}

export async function createItem(data) {
    return fetch(BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export async function updateItem(id, data) {
    return fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
}

export async function deleteItem(id) {
    return fetch(`${BASE}/${id}`, { method: "DELETE" });
}

export async function filterItems({ title, fields }) {
    const params = new URLSearchParams();

    if (title) params.append("title", title);
    if (fields?.length) params.append("fields", fields.join(","));

    const res = await fetch(`/api/items/filter?${params.toString()}`);
    return res.json();
}