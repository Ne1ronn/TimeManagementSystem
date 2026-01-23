export function renderItems(items, { onDelete, onEdit }) {
    const ul = document.getElementById("items");
    ul.innerHTML = "";

    items.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div>
                <strong>${item.title}</strong>
                <span>${item.description}</span>
            </div>
            <div>
                <button class="edit">✎</button>
                <button class="delete">✕</button>
            </div>
        `;

        li.querySelector(".delete").onclick = () => onDelete(item._id);
        li.querySelector(".edit").onclick = () => onEdit(item);

        ul.appendChild(li);
    });
}