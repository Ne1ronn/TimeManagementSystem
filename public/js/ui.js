export function renderTimeBlocks(timeBlocks, { onDelete, onEdit, onDetails }) {
    const ul = document.getElementById("timeBlocks");
    ul.innerHTML = "";

    timeBlocks.forEach(item => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="time-blocks-main">
                <strong>${item.title}</strong>
                <div class="time-blocks-meta">
                    <span>${item.day}</span>
                    <span>${item.startTime} – ${item.endTime}</span>
                    <span>Priority: ${item.priority}</span>
                </div>
            </div>

            <div class="time-blocks-actions">
                <button class="details">Details</button>
                <button class="edit">✎</button>
                <button class="delete">✕</button>
            </div>
        `;

        li.querySelector(".details").onclick = () => onDetails(item._id);
        li.querySelector(".edit").onclick = () => onEdit(item);
        li.querySelector(".delete").onclick = () => onDelete(item._id);

        ul.appendChild(li);
    });
}
