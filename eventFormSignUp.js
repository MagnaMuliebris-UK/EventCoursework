function validateFormData(){
    let button = document.getElementById("submitButton");
    button.addEventListener("click", function(event){
        event.preventDefault();

        let forename = document.getElementById("forename").value;
        let surname = document.getElementById("surname").value;
        let email = document.getElementById("email").value;
        let forenameRegex= "/^[a-zA-Z]+$/";
        let surnameRegex= "/^[a-zA-Z]+$/";
        let emailRegex= "/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/";
        let fnameValid = RegExp(forenameRegex).test(forename);
        let snameValid = RegExp(surnameRegex).test(surname);
        let emailValid = RegExp(emailRegex).test(email);

        if(fnameValid && snameValid && emailValid){
            alert("Form submitted successfully!");
            //CHECK IF WORKS AS INTENDED
            event.target.form.submit();
        }
        //No need for an else, html custom validation message.
    });
};
