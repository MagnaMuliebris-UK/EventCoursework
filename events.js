function validateFormData(){
    let button = document.getElementById("submitButton");
    button.addEventListener("click", function(event){
        event.preventDefault();

        let eventTitle = document.getElementById("eventTitle").value;
        let eventDate = document.getElementById("eventDate").value;
        let eTitleRegex= "/^[a-zA-Z]+$/";
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


// List of all student events

const events = [

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
    time: "13:00 PM",
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
    
    // Function to open the event details page
    
    function openEvent(id){
    
    localStorage.setItem("selectedEvent", id);
    
    window.location.href = "event-details.html";
    
    }
