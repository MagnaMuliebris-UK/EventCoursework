const container = document.querySelector(".upcoming-events");

events.slice(0,3).forEach(event => {

const card = document.createElement("div");
card.classList.add("event-card");

card.innerHTML = `

<div class="event-icon">

<span class="category-btn" onclick="openEvent(${event.id})">
${event.category}
</span>

${event.icon}

</div>

<div class="event-details">
<h3>${event.title}</h3>

<p class="event-meta">
📅 ${event.date} | ⏰ ${event.time}
</p>

</div>

`;

container.appendChild(card);

});