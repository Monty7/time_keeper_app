class Times {
    constructor({captured_date, clocked_in, clocked_out}){
        this.captured_date = captured_date;
        this.clocked_in = clocked_in;
        this.clocked_out = clocked_out;
        // this.captured_date = e.target.parentElement.parentElement.children[0].innerText;
        // this.clocked_in = e.target.parentElement.parentElement.children[2].value;
        // this.clocked_out = e.target.parentElement.parentElement.children[4].value;

        render = () => {
            this.div.innerHTML = `                    
            <div class="item" >
                <span>01</span>
                <label>Clock In</label>
                <input type="time" name="clockIn"placeholder="Clock In" class="clockIn" value=${this.clocked_in}>
                <label>Clock Out</label>
                <input type="time" name="clockOut" placeholder="Clock Out" class="clockOut" value=${this.clocked_out}>
                <div>
                    <button class="addTime">Add</button>
                    <button class="addTime">Delete</button>
                    <button class="addTime">Update</button>
                </div>
            </div>
            `

        }

    }
}