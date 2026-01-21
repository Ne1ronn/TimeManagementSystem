export function renderItems(items, onDelete) {
    const list = document.getElementById("items");
    list.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <strong>${item.title}</strong>
            <span>${item.description}</span>
            <button data-id="${item._id}">❌</button>
        `;

        li.querySelector("button").onclick = () =>
            onDelete(item._id);

        list.appendChild(li);
    });
}