//Global variable & global variable logic begin
const baseEvents = [
    {
    id: 1,
    title: "5-a-side Football Tournament",
    category: "Sports",
    date: "2026-04-27",
    time: "5:00 PM",
    location: "Nelson place",
    icon: "⚽",
    bg: '#c6bc81'
    },
    
    {
    id: 2,
    title: "Freshers Mixer Night",
    category: "Social",
    date: "2026-05-06",
    time: "7:00 PM",
    location: "Student Union Bar",
    icon: "🎉",
    bg: '#9ca2d4'
    },
    
    {
    id: 3,
    title: "Maths Study Group",
    category: "Study",
    date: "2026-05-18",
    time: "3:00 PM",
    location: "Library Room 120",
    icon: "📚",
    bg: '#cd096c'
    },
    
    {
    id: 4,
    title: "Drama Society Showcase",
    category: "Culture",
    date: "2026-05-26",
    time: "6:00 PM",
    location: "BC-03-311",
    icon: "🎭",
    bg: '#47360d'
    },
    
    {
    id: 5,
    title: "Basketball Open Run",
    category: "Sports",
    date: "2026-06-02",
    time: "5:30 PM",
    location: "Jordanstown",
    icon: "🏀",
    bg: '#a865df'
    },
    
    {
    id: 6,
    title: "Career Fair Workshop",
    category: "Study",
    date: "2026-06-17",
    time: "11:00 AM",
    location: "LG-00-211",
    icon: "💼",
    bg: '#093d48'
    },
    
    {
    id: 7,
    title: "International Food Festival",
    category: "Social",
    date: "2026-06-23",
    time: "1:00 PM",
    location: "Student Union",
    icon: "🍜",
    bg: '#422844'
    },
    
    {
    id: 8,
    title: "Sharing Cultural Identity",
    category: "Culture",
    date: "2026-07-01",
    time: "11:00 AM",
    location: "Ulster University",
    icon: "🫱🏽‍🫲🏾🌍",
    bg: '#9b5b34'
    }
];
// List of all student events
var events = JSON.parse(localStorage.getItem("events")) || [...baseEvents];

// Tracks which category filter is currently active. Defaults to All
var activeCategory = 'All';
// Tracks the current search query entered by the user
var searchQuery = '';

// SEARCH INPUT
// Gets the search input element from the DOM
var searchBox = document.getElementById('searchInput');

if (searchBox) {
    // Fires every time the user types in the search box
  searchBox.addEventListener('input', function () {
      // Updates searchQuery with the current input, trimming whitespace
    searchQuery = this.value.trim();
    renderEvents();
  });
}
//SEARCH INPUT END

// CATEGORY BUTTONS
// Gets all filter buttons from the DOM
var btns = document.querySelectorAll('.filter-btn');

if (btns.length > 0) {
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {

    // Removes active highlight from all buttons
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.remove('active');
    }

    // Highlights the clicked button as active
    this.classList.add('active');
    // Updates activeCategory to the clicked button's category value
    activeCategory = this.dataset.cat;
    // Re-renders events filtered by the new category
    renderEvents(); // re-render events
    });
  }
}
//CATEGORY BUTTON END

//Global variable end

//Makes localstorage save of stored events, and some other likely necessary work
function save() {
    localStorage.setItem("events", JSON.stringify(events));
    events = JSON.parse(localStorage.getItem("events"));
}
save();

// Function to open the event details page   
function openEvent(id){    
    localStorage.setItem("selectedEvent", id);
    window.location.href = "event-details.html";
}

function getRandomHex() {
  // Generates a random number, converts to hex, and pads with zeros if needed
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

//matches and thus creates event.
function CreateNewEvent(eventTitle, eventDate, eventTime, eventCategory, eventLocation, eventIcon){
    let nextId = Math.max(...events.map(e => e.id)) + 1;
    events.push({id: nextId,
                 title: eventTitle,
                 category: eventCategory,
                 date: eventDate,
                 time: eventTime,
                 location: eventLocation,
                 icon: eventIcon,
                 bg: getRandomHex()}
               ); save();
}

//Validates all data.
function validateFormData(){
  let button = document.getElementById("submitButton");
    button.addEventListener("click", function(event){
        event.preventDefault();

        //eventTitle
        let eventTitle = document.getElementById("eventTitle").value;
        let eTitleRegex= /^[a-zA-Z ]+$/; // Only letters and spaces allowed
        let eTitleValid = RegExp(eTitleRegex).test(eventTitle);

        //eventDate
        let eventDate = document.getElementById("eventDate").value;
        let eDateRegex= /^(?:\d{4}-(?:(?:(?:(?:0[13578]|1[02])-(?:0[1-9]|[1-2][0-9]|3[01]))|(?:(?:0[469]|11)-(?:0[1-9]|[1-2][0-9]|30))|(?:02-(?:0[1-9]|1[0-9]|2[0-8]))))|(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26]))|(?:(?:[02468][048])|[13579][26])00)-02-29)$/; // YYYY-MM-DD format, also accounts for leap years, month variable days, etc. Tested via regex101
        let eDateValid = RegExp(eDateRegex).test(eventDate);

        //eventTime (12hr and 24hr appropriate)
        let eventTime = document.getElementById("eventTime").value;
        let eTimeRegex= /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM format, 24hr. Resolves AM and PM later.
        let eTimeAMPMRegex= /^(0[1-9]|1[0-2]):([0-5]\d) (A|P)M$/; // HH:MM format, 12hr, needs AM or PM entered. Requires : and the ' '
        let eTimeValid = RegExp(eTimeRegex).test(eventTime)||RegExp(eTimeAMPMRegex).test(eventTime);//Checks if satiates either.

        //eventType
        let eventType = document.getElementById("eventType").selectedOptions;
        let eTypeValid = document.getElementById("eventType").value !== "Choose Event Category";

        //eventLocation
        let eventLocation = document.getElementById("eventLocation").value;
        let eLocationRegex = /^[a-zA-Z0-9 ',-]+$/; //Only letters, spaces, possible necessary punctuation and numbers allowed.
        let eLocationValid = RegExp(eLocationRegex).test(eventLocation);

        //eventIcon
        let eventIcon = document.getElementById("eventIcon").selectedOptions;
        let eIconValid = document.getElementById("eventIcon").value !== "Choose Icon";

        if(eTitleValid && eDateValid &&
           eTimeValid && eTypeValid &&
           eIconValid && eLocationValid){
            alert("Form submitted successfully!");
            
            //eventTime 24hr to 12hr converter. Ignores if already 12hr
            if(RegExp(eTimeRegex).test(eventTime)){
                //for sorting. restOfStuff readded later
                let [hours, restOfStuff] = eventTime.split(':');
                hours = parseInt(hours);
                //if PM and not noon
                if(hours>12){
                    eventTime=`${hours-12}:${restOfStuff} PM`;
                }
                //if noon
                else if(hours==12){
                    eventTime+=" PM";
                }
                //if AM and not midnight
                else if(hours !== 0){
                    eventTime+=" AM";
                }
                //if midnight
                else{
                    eventTime=`${hours+12}:${restOfStuff} AM`;
                }
            }
            CreateNewEvent(eventTitle, eventDate, eventTime, eventType, eventLocation, eventIcon);
            event.target.form.submit();
        }
        else{
        //handled in html
        }
    });
}
validateFormData();

// FILTER LOGIC
// Returns only events that match both the active category and search query
function getFilteredEvents() {
  var results = [];

  for (var i = 0; i < events.length; i++) {
    var ev = events[i];
    
    // Checks if event matches the selected category, or if All is selected
    var categoryMatch =
      (activeCategory === 'All') ||
      (ev.category === activeCategory);

    var query = searchQuery.toLowerCase();

    var searchMatch =
      (query === '') ||
      ev.title.toLowerCase().indexOf(query) !== -1 ||
      ev.location.toLowerCase().indexOf(query) !== -1 ||
      ev.category.toLowerCase().indexOf(query) !== -1; 

    // Only includes event if it passes both checks
    if (categoryMatch && searchMatch) {
      results.push(ev);
    }
  }

  return results;
}
//FILTER LOGIC END

//RENDER EVENT START
// Builds and displays the event cards based on current filters and search
function renderEvents() {
  var container = document.getElementById("eventsGrid");

  // Exits early if the container doesn't exist, prevents crashes on other pages
  if (!container) return; //prevents crashes

  var filtered = getFilteredEvents();

  container.innerHTML = "";

  // Shows a message if no events match the current search/filter
  if (filtered.length === 0) {
    container.innerHTML = "<p>No events found.</p>";
    return;
  }

  var html = "";

  // Loops through filtered events and builds a card for each one
  for (var i = 0; i < filtered.length; i++) {
    var ev = filtered[i];

    html += `
      <div class="event-card" onclick="openEvent(${ev.id})">
        <div class="event-image ${ev.category.toLowerCase()}">
          <span class="category-btn">${ev.category}</span>
          ${ev.icon}
        </div>
        <div class="event-details">
          <h3>${ev.title}</h3>
          <p class="event-meta">${ev.date}</p>
        </div>
      </div>`;
  }

  // Inserts all generated cards into the container at once
  container.innerHTML = html;
}
//RENDER EVENT END

// Waits for the DOM to be ready before rendering, or renders immediately if already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderEvents);
} else {
  renderEvents();
}
