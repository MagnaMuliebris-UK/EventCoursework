import{baseEvents} from "./events.js";

var events = [...baseEvents];
if((JSON.parse(localStorage.getItem("events")))&&(JSON.parse(localStorage.getItem("events"))!="[]"))
{
  events = JSON.parse(localStorage.getItem("events"));
}

/* DISPLAY EVENTS */
const grid = document.getElementById("events-grid");
function displayEvents(eVents){
  if(!grid) return;
eVents.forEach(event => {

const card = document.createElement("div");
card.className = "event-card";

card.innerHTML = `
<div class="event-image ${event.category}">
<span class="category-btn">${event.category}</span>
${event.icon}
</div>

<div class="event-details">
<h3>${event.title}</h3>
<p class="event-meta">${event.date}</p>
</div>
`;

card.onclick = () => openEvent(event);

grid.appendChild(card);

});
}
displayEvents(events);


/* OPEN EVENT DETAILS */

function openEvent(event){

document.getElementById("eventsPage").style.display = "none";
document.getElementById("eventDetails").style.display = "block";

document.getElementById("icon").innerText = event.icon;
document.getElementById("title").innerText = event.title;
document.getElementById("date").innerText = "📅 " + event.date;
document.getElementById("time").innerText = "⏰ " + event.time;
document.getElementById("location").innerText = "📍 " + event.location;

}


/* BUTTONS */

function rsvpEvent(){
alert("✅ You are going to this event!");
}

function saveEvent(){
alert("⭐ Event saved to favourites!");
}

function goBack(){

document.getElementById("eventDetails").style.display = "none";
document.getElementById("eventsPage").style.display = "block";

}
