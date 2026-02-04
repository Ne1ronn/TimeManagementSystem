export function renderItems(items, { onDelete, onEdit }) {
    const ul = document.getElementById("items");
    ul.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="item-main">
                <strong>${item.title}</strong>
                <div class="item-meta">
                    <span>${item.day}</span>
                    <span>${item.startTime} – ${item.endTime}</span>
                    <span>Priority: ${item.priority}</span>
                </div>
                ${item.description ? `<div class="item-desc">${item.description}</div>` : ""}
            </div>
            <div class="item-actions">
                <button class="edit">✎</button>
                <button class="delete">✕</button>
            </div>
        `;

        li.querySelector(".delete").onclick = () => onDelete(item._id);
        li.querySelector(".edit").onclick = () => onEdit(item);

        ul.appendChild(li);
    });
}