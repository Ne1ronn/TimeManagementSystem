const API_URL = "/api/items";

export async function getItems() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to load items");
    return res.json();
}

export async function createItem(data) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error("Failed to create item");
    return res.json();
}

export async function deleteItem(id) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!res.ok) throw new Error("Failed to delete item");
}