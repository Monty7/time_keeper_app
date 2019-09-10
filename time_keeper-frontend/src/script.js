const BASE_URL = "http://localhost:3000/user_times";

const calendarContainer = document.querySelector('.calendar');
//const addTimeBtn = document.querySelectorAll('.addTime');addTimeBtn.addEventListener('click', function(e){
calendarContainer.addEventListener('click', function(e){

    e.preventDefault();
    if(e.target.tagName === "BUTTON"){
        let captured_date = e.target.parentElement.children[0].innerText;
        let clocked_in = e.target.parentElement.children[2].value;
        let clocked_out = e.target.parentElement.children[4].value;
        fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"           
            },
            body: JSON.stringify({clock_in: clocked_in, clock_out: clocked_out})
        })
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            console.log(data);
        })
    }
})

