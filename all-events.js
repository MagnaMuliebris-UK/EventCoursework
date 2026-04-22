import {events} from "./events.js";
//comment test
const container = document.querySelector(".events-grid");

events.forEach(event => {

const card = document.createElement("div");
card.classList.add("event-card");

card.innerHTML = `

<div class="event-image ${event.category.toLowerCase()}">

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

<p class="event-meta">
📍 ${event.location}
</p>

</div>

`;

container.appendChild(card);

});
