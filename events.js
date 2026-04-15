function validateFormData(){
    let button = document.getElementById("submitButton");
    button.addEventListener("click", function(event){
        event.preventDefault();

        let eventTitle = document.getElementById("eventTitle").value;
        let eventDate = document.getElementById("eventDate").value;
        let eTitleRegex= "/^[a-zA-Z ]+$/";
        let eDateRegex= "/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\x01|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\x02))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\x03(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\x04(?:(?:1[6-9]|[2-9]\d)?\d{2})$/";
        let eTitleValid = RegExp(eTitleRegex).test(eventTitle);
        let eDateValid = RegExp(eDateRegex).test(eventDate);
        
        if(eTitleValid && eDateValid){
            alert("Form submitted successfully!");
            //CHECK IF WORKS AS INTENDED
            event.target.form.submit();
        }
        //No need for an else, html custom validation message.
    });
};

validateFormData();

var activeCategory = 'All';
var searchQuery = '';

// FILTER LOGIC
function getFilteredEvents() {
  var results = [];

  for (var i = 0; i < EVENTS.length; i++) {
    var ev = EVENTS[i];

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

// SEARCH INPUT
document.getElementById('searchInput').addEventListener('input', function () {
  searchQuery = this.value.trim();
  renderEvents(); // calls Person 2's function
});

// CATEGORY BUTTONS
var btns = document.querySelectorAll('.filter-btn');

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
