class Times {
    constructor({captured_date, clocked_in, clocked_out}){
        this.captured_date = e.target.parentElement.parentElement.children[0].innerText;
        this.clocked_in = e.target.parentElement.parentElement.children[2].value;
        this.clocked_out = e.target.parentElement.parentElement.children[4].value;

    }
}