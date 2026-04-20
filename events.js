//Global variable & global variable logic begin
const baseEvents = [
    {
    id: 1,
    title: "5-a-side Football Tournament",
    category: "Sports",
    date: "2026-04-27",
    time: "5:00 PM",
    location: "Nelson place",
    icon: "⚽"
    },
    
    {
    id: 2,
    title: "Freshers Mixer Night",
    category: "Social",
    date: "2026-05-06",
    time: "7:00 PM",
    location: "Student Union Bar",
    icon: "🎉"
    },
    
    {
    id: 3,
    title: "Maths Study Group",
    category: "Study",
    date: "2026-05-18",
    time: "3:00 PM",
    location: "Library Room 120",
    icon: "📚"
    },
    
    {
    id: 4,
    title: "Drama Society Showcase",
    category: "Culture",
    date: "2026-05-26",
    time: "6:00 PM",
    location: "BC-03-311",
    icon: "🎭"
    },
    
    {
    id: 5,
    title: "Basketball Open Run",
    category: "Sports",
    date: "2026-06-02",
    time: "5:30 PM",
    location: "Jordanstown",
    icon: "🏀"
    },
    
    {
    id: 6,
    title: "Career Fair Workshop",
    category: "Study",
    date: "2026-06-17",
    time: "11:00 AM",
    location: "LG-00-211",
    icon: "💼"
    },
    
    {
    id: 7,
    title: "International Food Festival",
    category: "Social",
    date: "2026-06-23",
    time: "1:00 PM",
    location: "Student Union",
    icon: "🍜"
    },
    
    {
    id: 8,
    title: "Sharing Cultural Identity",
    category: "Culture",
    date: "2026-07-01",
    time: "11:00 AM",
    location: "Ulster University",
    icon: "🫱🏽‍🫲🏾🌍"
    }
];
// List of all student events
var events = JSON.parse(localStorage.getItem("events")) || [...baseEvents];

var activeCategory = 'All';
var searchQuery = '';

// SEARCH INPUT
var searchBox = document.getElementById('searchInput');

if (searchBox) {
  searchBox.addEventListener('input', function () {
    searchQuery = this.value.trim();
    renderEvents();
  });
}
//SEARCH INPUT END

// CATEGORY BUTTONS
var btns = document.querySelectorAll('.filter-btn');

if (btns.length > 0) {
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {

    // remove active from all
    for (var j = 0; j < btns.length; j++) {
      btns[j].classList.remove('active');
    }

    // add active to clicked
    this.classList.add('active');

    activeCategory = this.dataset.cat;

    renderEvents(); // re-render events
    });
  }
}
//CATEGORY BUTTON END

//Global variable end

function save() {
    localStorage.setItem("events", JSON.stringify(events)); //overwrites. Saved to client only
}
save();//not entirely necessary, but makes the JSON out of good practice.

// Function to open the event details page   
function openEvent(id){    
    localStorage.setItem("selectedEvent", id);
    window.location.href = "event-details.html";
}
//matches and thus creates event. Overwrites JSON with appended array.
function CreateNewEvent(eventTitle, eventDate, eventTime, eventCategory, eventLocation, eventIcon){
    let nextId = Math.max(events.map(event => event.id)) + 1;
    events.push({id: nextId,
                 title: eventTitle,
                 category: eventCategory,
                 date: eventDate,
                 time: eventTime,
                 location: eventLocation,
                 icon: eventIcon}
               ); save();
}
function validateFormData(){
  let button = document.getElementById("submitButton");
    button.addEventListener("click", function(event){
        event.preventDefault();

        let eventTitle = document.getElementById("eventTitle").value;
        let eventDate = document.getElementById("eventDate").value;
        let eventTime = document.getElementById("eventTime").value;
        let eventType = document.getElementById("eventType").selectedOptions; //Checks if 
        let eventLocation = document.getElementById("eventLocation").value;
        let eventIcon = document.getElementById("eventIcon").selectedOptions; //Idk what the options available should be!
        
        let eTitleRegex= /^[a-zA-Z ]+$/; // Only letters and spaces allowed
        let eDateRegex= /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD format
        let eTimeRegex= /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM format, 24hr. Resolves AM and PM later.
        let eTimeAMPMRegex= /^([01]\d|2[0-3]):([0-5]\d) (A|P)M$/; // HH:MM format, 12hr, needs AM or PM entered. Requires : and the ' '
        let eLocationRegex = /^[a-zA-Z0-9 ',-]+$/; //Only letters, spaces, possible necessary punctuation and numbers allowed.
       
        let eTitleValid = RegExp(eTitleRegex).test(eventTitle);
        let eDateValid = RegExp(eDateRegex).test(eventDate);
        let eTimeValid = RegExp(eTimeRegex).test(eventTime)||RegExp(eTimeAMPMRegex).test(eventTime);//Checks if satiates either. Will not bother with if else if statements if its 2nd one
        let eTypeValid = !(eventType=="Choose Event Category");
        let eIconValid = !(eventIcon=="Choose Icon");
        let eLocationValid = RegExp(eLocationRegex).test(eventLocation);
            
        if(eTitleValid && eDateValid&& eTimeValid&&eTypeValid&&eIconValid&&eLocationValid){
            alert("Form submitted successfully!");
            //For 24hr extra validation and parity
            let [hours, restOfStuff] = eventTime.split(':');
            hours = parseInt(hours);
            if(RegExp(eTimeRegex).test(eventTime)){
                if(hours>12){
                    eventTime=${hours-12}+restOfStuff+" PM";
                }
                else if(hours==12){
                    eventTime+=" PM";
                }
                else{
                    eventTime+=" AM";
                }
            }
            CreateNewEvent(eventTitle, eventDate, eventTime, eventType, eventLocation, eventIcon); 
            //CHECK IF WORKS AS INTENDED
            event.target.form.submit();
        }
        //No need for an else, html custom validation message.
    });
}
validateFormData();

// FILTER LOGIC
function getFilteredEvents() {
  var results = [];

  for (var i = 0; i < events.length; i++) {
    var ev = events[i];

    var categoryMatch =
      (activeCategory === 'All') ||
      (ev.category === activeCategory);

    var query = searchQuery.toLowerCase();

    var searchMatch =
      (query === '') ||
      ev.title.toLowerCase().indexOf(query) !== -1 ||
      ev.location.toLowerCase().indexOf(query) !== -1 ||
      ev.category.toLowerCase().indexOf(query) !== -1; 

    if (categoryMatch && searchMatch) {
      results.push(ev);
    }
  }

  return results;
}

function renderEvents() {
  var container = document.getElementById("eventsContainer");

  if (!container) return; //  prevents crashes

  var filtered = getFilteredEvents();

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No events found.</p>";
    return;
  }

  var html = "";

  for (var i = 0; i < filtered.length; i++) {
    var ev = filtered[i];

    html += `
      <div class="event-card" onclick="openEvent(${ev.id})">
        <h3>${ev.icon} ${ev.title}</h3>
        <p>${ev.category}</p>
        <p>${ev.date} - ${ev.time}</p>
        <p>${ev.location}</p>
      </div>`;
  }

  container.innerHTML = html;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderEvents);
} else {
  renderEvents();
}
