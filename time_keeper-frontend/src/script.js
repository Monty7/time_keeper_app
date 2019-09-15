const TIMES_URL = "http://localhost:3000/user_times";
const USER_URL = "http://localhost:3000/users";

const calendarContainer = document.querySelector('.calendar');
const calculateBtn = document.querySelector('#calculate');
let calculateMonthTotal = 0;
let userID = localStorage.getItem('loggedInUserID');

//let loggedInUser;
//store the whole user object here 
const currentTime = document.querySelector('#currentTime');
const submitUser = document.querySelector('#submit_user');
const logoutLink = document.querySelector('#logout');
const allDateContainers = document.querySelectorAll('.item');

calendarContainer.addEventListener('click', function(e){
    let currentUser;
    if(e.target.textContent === "Add"){
        e.preventDefault();
        let captured_date = e.target.parentElement.children[0].innerText;
        let clocked_in = e.target.parentElement.children[2].value;
        let clocked_out = e.target.parentElement.children[4].value;
       // let monthOfTimes = getTimeCardMonth();
        
       // calculateMonthTotal += timeDifferenceInADay(clocked_out, clocked_in)

      //  let totalMonthTime = convertTime(calculateMonthTotal);

        // console.log(totalMonthTime);

        // console.log(captured_date, typeof captured_date);
        // console.log(monthOfTimes, typeof monthOfTimes);
        
        fetch(TIMES_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"           
            },
            body: JSON.stringify(
                {clock_in: clocked_in, 
                clock_out: clocked_out, 
                //month_time: totalMonthTime, 
                date_of_times: captured_date, 
                month_of_times: monthOfTimes, 
                user_id: userID
            })
        })
        .then(function(res){
            console.log(res)
            return res.json();
        })
        .then(function(data){
            if (data.err_message){
                alert(data.err_message)
            } else {

                calcTime(data)
               // let diff = timeDifferenceInADay(data.user_times[35].clock_in.slice(11, 16), data.user_times[35].clock_out.slice(11, 16))

               
               // console.log(totalMonthTime);
               // console.log(convertTime(totalMonthTime));
               
               // console.log(convertTime(diff));
                console.log(data);
          }
        })
    }

    // if(e.target.textContent === "Calculate"){
    //     console.log(currentUser);
    // }
})

submitUser.addEventListener('click', function(e) {
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
        login(data)
       // loggedInUser = data;
        
          
    })

})

function calcTime(data){
    let totalMonthTime = 0;
    data.user_times.forEach(function(stamp){
        totalMonthTime += timeDifferenceInADay(stamp.clock_in.slice(11, 16), stamp.clock_out.slice(11, 16));
    })
    currentTime.innerText = convertTime(totalMonthTime);
}

logoutLink.addEventListener('click', function(e){
 
    e.preventDefault()
    logout();
    //logout and remove logout link then display the signin link
})

// function getTimeCardMonth(){
//     var d = new Date();
//     var monthStrings = new Array();
//     monthStrings[0] = "January";
//     monthStrings[1] = "February";
//     monthStrings[2] = "March";
//     monthStrings[3] = "April";
//     monthStrings[4] = "May";
//     monthStrings[5] = "June";
//     monthStrings[6] = "July";
//     monthStrings[7] = "August";
//     monthStrings[8] = "September";
//     monthStrings[9] = "October";
//     monthStrings[10] = "November";
//     monthStrings[11] = "December";
//     var monthAsString = monthStrings[d.getMonth()];
//     return monthAsString;
// }

function convertTime(timeSeconds){

let seconds = (timeSeconds / 1000) % 60;
let minutes = ((timeSeconds / (1000*60)) % 60);
let hours = Math.floor((timeSeconds / (1000*60*60)) % 24);
let twelveHours = Math.floor((timeSeconds / (1000*60*60)) % 12);

   return `${hours} HOURS, ${minutes} MINUTES`;
 
}

function timeDifferenceInADay(end, start){
    start = start.split(":");
    // if(start[0] === "00" || end[0] === "00"){
    //     console.log("I should be 24 instead!!!!");
    // }

    end = end.split(":");

    let startTime = new Date(0, 0, 0, start[0], start[1], 0);
    let endTime = new Date(0, 0, 0, end[0], end[1], 0);

    return Math.abs(startTime.getTime() - endTime.getTime()); //seconds
}

function displayCurrentUser(name){
    if(localStorage.getItem !== null){
        let userNameContainer = document.createElement('div');
        let userName = document.createElement('p');
        let signInContainer = document.getElementById('sign_up_in');
        userName.innerText = `Welcome, ${name}`;
        userNameContainer.append(userName);
        signInContainer.append(userName);
    }
}

function logout(){
    localStorage.clear();
    clearTimeValues();
}

function login(data){
  //  console.log(data)
    localStorage.setItem('loggedInUserID', data.id);
    displayCurrentUser(data.name); 
   // loggedInUser = data
   console.log(data);
//    console.log(data.user_times[2].clock_in.slice(8, 10))
//     console.log(allDateContainers[5].children[0].innerText)

    allDateContainers.forEach(function(dateContainer){
        data.user_times.forEach(function(stamp){
            if(dateContainer.children[0].innerText === stamp.clock_in.slice(8, 10)){
                dateContainer.children[2].value = stamp.clock_in.slice(11, 16);
                dateContainer.children[4].value = stamp.clock_out.slice(11, 16);  //fills out all dates with the last clock_out value in user_times array
            }
        })
    })
    calcTime(data)
}

function clearTimeValues(){
    allDateContainers.forEach(function(dateContainer){
        dateContainer.children[2].value = "";
        dateContainer.children[4].value = "";
    })
}

function checkForUser(){
    if(userID != 'undefined'){
        console.log(userID)

        fetch(`${USER_URL}/${userID}`)
        .then(function(res){
           // console.log(res);
            return res.json();
        })
        .then(function(data){
           
            login(data)
        })
        .catch(function(err){
            console.log(err);
        })

    }
}

checkForUser()


