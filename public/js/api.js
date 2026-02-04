const BASE = "/api/items";

export async function getItems(params = {}) {
    const query = new URLSearchParams(params);
    const res = await fetch(`/api/items?${query}`);
    return res.json();
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

export async function filterItems(params) {
    const query = new URLSearchParams(params);
    const res = await fetch(`/api/items?${query}`);
    return res.json();
}