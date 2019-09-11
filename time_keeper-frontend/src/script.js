const BASE_URL = "http://localhost:3000/user_times";
let loggedInUser = null;
const calendarContainer = document.querySelector('.calendar');
const signInInput = document.querySelector('#sign_in_user');
//const addTimeBtn = document.querySelectorAll('.addTime');addTimeBtn.addEventListener('click', function(e){
calendarContainer.addEventListener('click', function(e){

    
    if(e.target.tagName === "BUTTON"){
        e.preventDefault();
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
            console.log(res.json());
            return res.json();
        })
        .then(function(data){
            if (data.err_message){
                alert(data.err_message)
            } else {
                console.log(calculateTime(clocked_in, clocked_out));
          }
        })
    }
})

signInInput.addEventListener(submit, function signUp(user){
    const loggedInUser = document.querySelector('#sign_in_user').value;

    fetch(BaseURL, {
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

})



function calculateTime(start, end){
    start = start.split(":");
    end = end.split(":");

    let startTime = new Date(0, 0, 0, start[0], start[1], 0);
    let endTime = new Date(0, 0, 0, end[0], end[1], 0);
    let difference = endDate.getTime() - startDate.getTime();
    console.log(difference);
    let hours = Math.floor(difference / 1000 / 60 / 60);
    console.log(hours);
    difference -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(difference / 1000 / 60);
    
    return `${hours}:${minutes}`;
    //return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;

    
}

