const TIMES_URL = "http://localhost:3000/user_times";
const USER_URL = "http://localhost:3000/users";

const calendarContainer = document.querySelector('.calendar');
const calculateBtn = document.querySelector('#calculate');
let calculateMonthTotal = 0;
let userID = localStorage.getItem('loggedInUserID');
//let loggedInUser;
//store the whole user object here 

const submitUser = document.querySelector('#submit_user');
const logoutLink = document.querySelector('#logout');

calendarContainer.addEventListener('click', function(e){
    let currentUser;
    if(e.target.textContent === "Add"){
        e.preventDefault();
        let captured_date = e.target.parentElement.children[0].innerText;
        let clocked_in = e.target.parentElement.children[2].value;
        let clocked_out = e.target.parentElement.children[4].value;
        let monthOfTimes = getTimeCardMonth();
        
       // calculateMonthTotal += timeDifferenceInADay(clocked_out, clocked_in)

        let totalMonthTime = convertTime(calculateMonthTotal);

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
           // console.log(() => res.json());
            return res.json();
        })
        .then(function(data){
            if (data.err_message){
                alert(data.err_message)
            } else {
               // console.log(data.user_times[0].clock_in);
                let test = Date.parse(data.user_times[0].clock_in)
                console.log(clocked_in);
                let diff = timeDifferenceInADay(clocked_out, clocked_in)
                console.log(diff)
                console.log(convertTime(diff));
               // let clockIn = `${Date.parse(data.user_times[0].clock_in).getHours()}:${Date.parse(data.user_times[0].clock_in).getMinutes()}`;
              //  let clockOut = `${Date.parse(data.user_times[0].clock_out).getHours()}:${Date.parse(data.user_times[0].clock_out).getMinutes()}`;
                //let timeSeconds = timeDifferenceInADay(clockOut, clockIn);
               // console.log(timeSeconds);
               // console.log(convertTime(timeSeconds));
               //timeDifferenceInADay(data.clock_in, data.clock_out)
             // console.log(currentUser);
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

// calculateBtn.addEventListener('click', function(e){
//    // e.preventDefault();
//    // console.log(e);
// })

logoutLink.addEventListener('click', function(e){
 
    e.preventDefault()
    logout();
    //logout and remove logout link then display the signin link
})

function getTimeCardMonth(){
    var d = new Date();
    var monthStrings = new Array();
    monthStrings[0] = "January";
    monthStrings[1] = "February";
    monthStrings[2] = "March";
    monthStrings[3] = "April";
    monthStrings[4] = "May";
    monthStrings[5] = "June";
    monthStrings[6] = "July";
    monthStrings[7] = "August";
    monthStrings[8] = "September";
    monthStrings[9] = "October";
    monthStrings[10] = "November";
    monthStrings[11] = "December";
    var monthAsString = monthStrings[d.getMonth()];
    return monthAsString;
}

function convertTime(timeSeconds){
//     timeSeconds = parseInt(timeSeconds, 10);
//     //let difference = timeDifferenceInADay(end, start);
//    // console.log(difference);
//     let hours = Math.floor(timeSeconds / 1000 / 60 / 60);
//    // console.log(hours);
//     timeSeconds -= hours * 1000 * 60 * 60;
//     let minutes = Math.floor(timeSeconds / 1000 / 60);
let seconds = (timeSeconds / 1000) % 60;
let minutes = ((timeSeconds / (1000*60)) % 60);
let hours = ((timeSeconds / (1000*60*60)) % 24);
   
    //return as an object instead
    return `${hours}:${minutes}`;
    //return minutes;
   // return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
 
}

function timeDifferenceInADay(end, start){
    start = start.split(":");
    end = end.split(":");

    let startTime = new Date(0, 0, 0, start[0], start[1], 0);
    let endTime = new Date(0, 0, 0, end[0], end[1], 0);
    return endTime.getTime() - startTime.getTime(); //seconds
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
}

function login(data){
  //  console.log(data)
    localStorage.setItem('loggedInUserID', data.id);
    displayCurrentUser(data.name); 
    loggedInUser = data
  //  console.log(loggedInUser)
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


