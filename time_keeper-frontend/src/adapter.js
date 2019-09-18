class App{
    constructor(baseURL){
        this.baseURL = baseURL
        this.calendarContainer = document.querySelector('.calendar');
        this.calculateBtn = document.querySelector('#calculate');
        this.currentTime = document.querySelector('#currentTime');
        this.signUpDiv = document.getElementById('sign_up');
        this.welcomeMessage = document.querySelector('#welcomeUser p');
        this.submitUser = document.querySelector('#submit_user');
        this.logoutLink = document.querySelector('#logoutLink');
        this.allDateContainers = document.querySelectorAll('.item');
        this.userID;
        this.times = [];
        this.calendarContainer.addEventListener("click", this.calendarContainerBtnEvents)
        this.submitUser.addEventListener("click", this.newOrFindUser)
        this.logoutLink.addEventListener("click", this.logoutLink)
    }


        calendarContainerBtnEvents = (e) => {
            if(e.target.textContent === "Add"){   
                e.preventDefault();
                let captured_date = e.target.parentElement.parentElement.children[0].innerText;
                let clocked_in = e.target.parentElement.parentElement.children[2].value;
                let clocked_out = e.target.parentElement.parentElement.children[4].value;
                console.log("User ID before posting times from JS is " + userID)
                
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
                      //  month_of_times: monthOfTimes, 
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
                        //console.log(data);
                  }
                })
            }
            if(e.target.textContent === "Update"){
                let captured_date = e.target.parentElement.parentElement.children[0].innerText;
                let updated_clock_in = e.target.parentElement.parentElement.children[2].value;
                let updated_clock_out = e.target.parentElement.parentElement.children[4].value;
                fetch(`${TIMES_URL}/${captured_date}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"           
                    },
                    body: JSON.stringify({user_id: userID, clock_in: updated_clock_in, clock_out: updated_clock_out, date_of_times: captured_date})
                })
                    .then(function(res){
                        return res.json();
                    })
                    .then(function(updated_data){
                        if(updated_data.err_message){
                            alert(updated_data.err_message)
                        }else{
                            calcTime(updated_data)
                        }   
                    })
            }
            if(e.target.textContent === "Delete"){
                console.log("Delete Works!!!")
                let captured_date = e.target.parentElement.parentElement.children[0].innerText;
                let deleted_clock_in = e.target.parentElement.parentElement.children[2].value;
                let deleted_clock_out = e.target.parentElement.parentElement.children[4].value;
          
                fetch(`${TIMES_URL}/${captured_date}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({user_id: userID, clock_in: deleted_clock_in, clock_out: deleted_clock_out, date_of_times: captured_date})
                })
                    .then(function(res){
                        return res.json();
                    })
                    .then(function(data_from_delete){
                        if(data_from_delete.err_message){
                            alert(data_from_delete.err_message)
                        }else{
                            alert("Timestamp has been deleted.");
                            calcTime(data_from_delete)
                        }   
                    })
            }
            
        }

        newOrFindUser = (e) => {
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
                login(data)  
                
            })
        
        }

        logoutLink =(e) => {
            e.preventDefault()
            logout();
        }

}

let app = new App("http://localhost:3000/user_times");