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
