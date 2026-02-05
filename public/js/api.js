const BASE = "/api/time-blocks";

const opts = {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" }
};

export async function getTimeBlock(params = {}) {
    const query = new URLSearchParams(params);
    const res = await fetch(`${BASE}?${query}`, {
        credentials: "same-origin"
    });
    return res.json();
}

export async function createTimeBlocks(data) {
    return fetch(BASE, {
        method: "POST",
        ...opts,
        body: JSON.stringify(data)
    });
}

export async function updateTimeBlock(id, data) {
    return fetch(`${BASE}/${id}`, {
        method: "PUT",
        ...opts,
        body: JSON.stringify(data)
    });
}

export async function deleteTimeBlock(id) {
    return fetch(`${BASE}/${id}`, {
        method: "DELETE",
        credentials: "same-origin"
    });
}

export async function filterTimeBlocks(params) {
    const query = new URLSearchParams(params);
    const res = await fetch(`${BASE}?${query}`, {
        credentials: "same-origin"
    });
    return res.json();
}