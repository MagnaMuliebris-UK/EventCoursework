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