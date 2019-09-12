const TIMES_URL = "http://localhost:3000/user_times";
const USER_URL = "http://localhost:3000/users";
//let loggedInUser = null;
const calendarContainer = document.querySelector('.calendar');
let calculateMonthTotal = 0;

const submitUser = document.querySelector('#submit_user');
//const addTimeBtn = document.querySelectorAll('.addTime');addTimeBtn.addEventListener('click', function(e){
calendarContainer.addEventListener('click', function(e){

    
    if(e.target.tagName === "BUTTON"){
        e.preventDefault();
        let captured_date = e.target.parentElement.children[0].innerText;
        let clocked_in = e.target.parentElement.children[2].value;
        let clocked_out = e.target.parentElement.children[4].value;
       // let totalDayTime = calculateDayTime(clocked_in, clocked_out); //returns minutes
        
        calculateMonthTotal += timeDifferenceInADay(clocked_out, clocked_in)

        let totalMonthTime = convertTime(calculateMonthTotal);

        console.log(totalMonthTime);
        let user = localStorage.getItem('loggedInUserID');
        fetch(TIMES_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"           
            },
            body: JSON.stringify({clock_in: clocked_in, clock_out: clocked_out, month_time: totalMonthTime, user_id: user})
        })
        .then(function(res){
           // console.log(res.json());
            return res.json();
        })
        .then(function(data){
            if (data.err_message){
                alert(data.err_message)
            } else {
                console.log(data);
               // console.log(calculateDayTime(clocked_in, clocked_out));
               // console.log(calclateMonthTotal());
          }
        })
    }
})

submitUser.addEventListener('click', function(e) {
    console.log(e);
    e.preventDefault();
    const signInInput = document.querySelector('#sign_in_user');
    const loggedInUser = signInInput.value;

    fetch(USER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"           
        },
        body: JSON.stringify({name: loggedInUser})
    })
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        //console.log(data.name);
        localStorage.setItem('loggedInUserID', data.id);
       // loggedInUser = 
    })

})



function convertTime(timeSeconds){
    
    //let difference = timeDifferenceInADay(end, start);
   // console.log(difference);
    let hours = Math.floor(timeSeconds / 1000 / 60 / 60);
   // console.log(hours);
    timeSeconds -= hours * 1000 * 60 * 60;
    let minutes = Math.floor(timeSeconds / 1000 / 60);
    
   
    //return as an object instead
    return `${hours}:${minutes}`;
    //return minutes;
    //return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
 
}

function timeDifferenceInADay(end, start){
    start = start.split(":");
    end = end.split(":");

    let startTime = new Date(0, 0, 0, start[0], start[1], 0);
    let endTime = new Date(0, 0, 0, end[0], end[1], 0);
    return endTime.getTime() - startTime.getTime(); //seconds
}


